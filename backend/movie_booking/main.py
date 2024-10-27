from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from .common.logger import CommonLogger
from .generated import movie_booking_pb2 as pb
from .agents.planner import PlannerAgent
from .agents.myself import MySelfAgent
from .agents.recommendation import RecommendationAgent
from .agents.booking import BookingAgent
import json
from datetime import datetime
import asyncio
from google.protobuf.json_format import MessageToJson, Parse
from swarm import Swarm
import traceback

app = FastAPI()
client = Swarm()
logger = CommonLogger()

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# エージェントの初期化
planner = PlannerAgent()
# planner.functions.append(MySelfAgent())
# planner.functions.append(RecommendationAgent())
# planner.functions.append(BookingAgent())

def create_server_message(message_type: str, data: dict) -> str:
    """Protocol Buffersメッセージを作成してJSON文字列に変換"""
    try:
        if message_type == "chat":
            chat_msg = pb.ChatMessage(
                type="chat",
                role=getattr(pb.ChatMessage.Role, data["role"].upper()),
                content=data["content"],
                agent_name=data.get("agent_name")
            )
            server_msg = pb.ServerMessage(chat=chat_msg)
        
        elif message_type == "progress":
            progress_msg = pb.ProgressUpdate(
                type="progress",
                status=data["status"],
                progress=data["progress"],
                detail=data.get("detail")
            )
            server_msg = pb.ServerMessage(progress=progress_msg)
        
        elif message_type == "frame":
            frame_type = getattr(pb.ProgressFrame.FrameType, data["frame_type"].upper())
            action = None
            if "action" in data:
                action = pb.FrameAction(
                    type=data["action"]["type"],
                    enabled=data["action"]["enabled"],
                    label=data["action"]["label"]
                )
            
            frame_msg = pb.ProgressFrame(
                type="frame",
                frame_type=frame_type,
                data=json.dumps(data["data"]).encode(),
                action=action
            )
            server_msg = pb.ServerMessage(frame=frame_msg)
        
        elif message_type == "status":
            status_msg = pb.SystemStatus(
                type="system_status",
                status=getattr(pb.SystemStatus.Status, data["status"].upper()),
                message=data.get("message")
            )
            server_msg = pb.ServerMessage(status=status_msg)
        
        else:
            raise ValueError(f"Unknown message type: {message_type}")
        
        return MessageToJson(server_msg)
    
    except Exception as e:
        logger.error(f"Error creating server message: {str(e)}")
        raise

def pretty_print_messages(messages) -> None:
    for message in messages:
        if message["role"] != "assistant":
            continue

        # print agent name in blue
        print(f"\033[94m{message['sender']}\033[0m:", end=" ")

        # print response, if any
        if message["content"]:
            print(message["content"])

        # print tool calls in purple, if any
        tool_calls = message.get("tool_calls") or []
        if len(tool_calls) > 1:
            print()
        for tool_call in tool_calls:
            f = tool_call["function"]
            name, args = f["name"], f["arguments"]
            arg_str = json.dumps(json.loads(args)).replace(":", "=")
            print(f"\033[95m{name}\033[0m({arg_str[1:-1]})")


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection established")

    try:
        # 初期状態の送信
        initial_status = create_server_message("status", {
            "status": "READY",
            "message": "ご要望をお聞かせください"
        })
        await websocket.send_text(initial_status)


        messages = []
        agent = planner

        while True:
            # クライアントからのメッセージを受信
            data = await websocket.receive_text()
            request = json.loads(data)
            
            # UserRequestメッセージに変換
            user_request = pb.UserRequest(
                type="user_request",
                message=request["message"]
            )

            # 処理中状態に更新
            processing_status = create_server_message("status", {
                "status": "PROCESSING",
                "message": "リクエストを処理中です"
            })
            await websocket.send_text(processing_status)

            try:
                messages.append({"role": "user", "content": user_request.message})

                response = client.run(
                    agent=agent,
                    messages=messages,
                    context_variables={},
                    stream=False,
                    debug=True,
                )
                pretty_print_messages(response.messages)

                user_message_content = ""
                for message in response.messages:
                    if message["role"] != "assistant":
                        continue

                    # print agent name in blue
                    #print(f"\033[94m{message['sender']}\033[0m:", end=" ")

                    # print response, if any
                    if message["content"]:
                        user_message_content += message["content"]

                logger.info(f"user_message_content = {user_message_content}")
                # ユーザーメッセージをチャットに表示
                user_message = create_server_message("chat", {
                    "role": "user",
                    "content": user_message_content
                })
                await websocket.send_text(user_message)

                # Plannerエージェントによる処理
                # async for response in planner.process_request(user_request.message):
                #     if isinstance(response, dict):  # 安全のためのチェック
                #         message_json = create_server_message(
                #             response["type"],
                #             response
                #         )
                #         await websocket.send_text(message_json)
                #         await asyncio.sleep(0.1)  # メッセージの連続送信を制御

                # 処理完了状態に更新
                completed_status = create_server_message("status", {
                    "status": "READY",
                    "message": "次のご要望をお聞かせください"
                })
                await websocket.send_text(completed_status)

            except Exception as e:
                stack_trace = traceback.format_exc()
                logger.error(f"Request processing error: {str(e)}\n\nStack Trace:\n{stack_trace}")
                error_message = create_server_message("status", {
                    "status": "ERROR",
                    "message": f"エラーが発生しました: {str(e)}"
                })
                await websocket.send_text(error_message)

    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
    finally:
        logger.info("WebSocket connection closed")
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
