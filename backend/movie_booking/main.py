# backend/movie_booking/main.py
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from .common.logger import CommonLogger
from .agents.planner import PlannerAgent
from .agents.myself import MySelfAgent
from .agents.recommendation import RecommendationAgent
from .agents.booking import BookingAgent
import json
import traceback
from swarm import Swarm, Agent
import asyncio
from pprint import pprint

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


# backend/movie_booking/main.py の該当部分を修正
async def process_stream(stream, websocket: WebSocket):
    """ストリームを非同期的に処理する"""
    messages = []
    agent = None

    for chunk in stream:
        # 非同期処理中に他の処理を許可
        await asyncio.sleep(0)

        #pprint(chunk)

        # 送信前にログ出力
        # if chunk.get("role") == "assistant" and chunk.get("content"):
        #     print(f"Sending assistant message: {chunk['content']}")
        # if chunk.get("role") == "tool" and chunk.get("content"):
        #     print(f"Sending tool message: {chunk['content']}")


        if "delim" in chunk:
            # デリミタはスキップ
            continue
        elif "response" in chunk:
            # 最終レスポンス
            final_response = chunk["response"]
            print(f"final_response = {final_response}")
            messages.extend(final_response.messages)
            agent = final_response.agent
            # 完了通知

            reply_mes = ""
            #for mes in final_response.messages:
            mes = final_response.messages[-1]
            content = mes.get("content")
            if content:
                print(f"content: {content}")
                reply_mes += content

            print("-------------------")
            print(reply_mes)
            await websocket.send_json({
                "type": "complete",
                "content": reply_mes
            })

        else:
            # メッセージの内容がある場合は送信
            if "content" in chunk and chunk.get("content"):
                await websocket.send_json({
                    "type": "stream",
                    "content": chunk["content"]
                })
            
            # ツール呼び出しの情報がある場合は送信
            if "tool_calls" in chunk:
                await websocket.send_json({
                    "type": "tool",
                    "data": chunk["tool_calls"]
                })

            # assistant（AI）の応答がある場合は送信
            # if chunk.get("role") == "assistant" and chunk.get("content"):
            #     await websocket.send_json({
            #         "type": "stream",
            #         "content": chunk["content"]
            #     })

            # # tool（関数）の応答がある場合は送信
            # if chunk.get("role") == "tool" and chunk.get("content"):
            #     await websocket.send_json({
            #         "type": "stream",
            #         "content": f"Tool response: {chunk['content']}"
            #     })

    return messages, agent

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logger.info("WebSocket connection established")

    try:
        planner = PlannerAgent(websocket)
        messages = []
        agent = planner

        while True:
            # クライアントからのメッセージを受信
            raw_message = await websocket.receive_text()
            try:
                user_message = json.loads(raw_message)
            except json.JSONDecodeError:
                logger.error(f"Invalid JSON received: {raw_message}")
                await websocket.send_json({
                    "type": "error",
                    "message": "Invalid message format"
                })
                continue

            #print("Received message:", user_message)
            messages.append({"role": "user", "content": user_message["message"]})

            try:
                # ストリーミングモードで実行
                stream = client.run(
                    agent=agent,
                    messages=messages,
                    context_variables={},
                    stream=True,
                    debug=True,
                )

                # ストリームを非同期的に処理
                new_messages, new_agent = await process_stream(stream, websocket)
                messages.extend(new_messages)
                if new_agent:
                    agent = new_agent

            except Exception as e:
                stack_trace = traceback.format_exc()
                logger.error(f"Request processing error: {str(e)}\n\nStack Trace:\n{stack_trace}")
                await websocket.send_json({
                    "type": "error",
                    "message": f"エラーが発生しました: {str(e)}"
                })

    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
        await websocket.send_json({
            "type": "error",
            "message": f"WebSocket error: {str(e)}"
        })
    finally:
        logger.info("WebSocket connection closed")
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)