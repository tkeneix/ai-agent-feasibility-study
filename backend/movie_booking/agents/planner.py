from swarm import Agent
from typing import List, Dict, Any
import json
from ..common.logger import log_async_function
from ..common.logger import log_function

class PlannerAgent(Agent):
    def __init__(self, websocket):
        super().__init__(
            name="Planner",
            instructions="""あなたは映画予約システムのプランナーです。
            ユーザーの要望を理解し、適切なエージェントに作業を振り分けます。
            
            利用可能なエージェント：
            1. MySelfAgent - ユーザーの個人情報管理
            2. RecommendationAgent - 映画の推薦エンジン
            3. BookingAgent - チケット予約の管理
            
            あなたの役割：
            1. ユーザーの意図を理解
            2. 必要な情報の特定
            3. 適切なエージェントの選択
            4. タスクの調整と順序付け
            5. 結果の統合と最終レスポンスの生成
            
            注意：実際の作業は各専門エージェントに依頼し、
            あなたは全体の進行管理に徹してください。
            """,
            functions=[
                self.transfer_to_booking,
                self.transfer_to_myself,
                self.transfer_to_recommendation,
                # self.create_action_plan,
                # self.coordinate_agents,
                # self.summarize_results
            ]
        )
        self._websocket = websocket

    @log_function
    def transfer_to_booking(self):
        from .booking import BookingAgent
        return BookingAgent(self._websocket)
    
    @log_function    
    def transfer_to_myself(self):
        from .myself import MySelfAgent
        print("デバッグメッセージ1")
        return MySelfAgent(self._websocket)

    @log_function
    def transfer_to_recommendation(self):
        from .recommendation import RecommendationAgent
        return RecommendationAgent(self._websocket)

    # @log_function
    # def create_action_plan(self, user_request: str):
    #     """ユーザーのリクエストから実行計画を作成"""
    #     return {
    #         "status": "success",
    #         "data": {
    #             "request_type": "movie_booking",
    #             "required_info": [
    #                 "user_location",
    #                 "user_preferences",
    #                 "available_schedule"
    #             ],
    #             "agent_sequence": [
    #                 {
    #                     "agent": "MySelfAgent",
    #                     "action": "get_location",
    #                     "required_for": "theater_search"
    #                 },
    #                 {
    #                     "agent": "MySelfAgent",
    #                     "action": "get_persona",
    #                     "required_for": "movie_recommendation"
    #                 }
    #             ],
    #             "expected_duration": "5-10 minutes",
    #             "fallback_options": {
    #                 "if_no_theaters": "expand_search_radius",
    #                 "if_no_seats": "suggest_alternative_showtime"
    #             }
    #         }
    #     }

    # @log_function
    # def coordinate_agents(self, action_plan: dict):
    #     """エージェント間の調整を行う"""
    #     return {
    #         "status": "success",
    #         "data": {
    #             "coordination": {
    #                 "sequence": ["myself", "recommendation", "booking"],
    #                 "data_flow": {
    #                     "location_to_recommendation": True,
    #                     "preferences_to_booking": True
    #                 },
    #                 "parallel_tasks": ["get_showtimes", "get_preferences"]
    #             },
    #             "progress": 0,
    #             "next_action": "get_user_location"
    #         }
    #     }

    # @log_function
    # def summarize_results(self, results: List[Dict]):
    #     """各エージェントからの結果を統合"""
    #     return {
    #         "status": "success",
    #         "data": {
    #             "summary": "最適な映画と予約オプションが見つかりました",
    #             "recommendation": {
    #                 "movie": "DUNE：パート2",
    #                 "showtime": "21:00",
    #                 "theater": "TOHOシネマズ 日比谷"
    #             },
    #             "booking_info": {
    #                 "reservation_id": "RSV-2024-001",
    #                 "seats": ["H10", "H11"],
    #                 "total_amount": 5400
    #             },
    #             "next_steps": [
    #                 "支払い手続きの完了",
    #                 "チケットのダウンロード"
    #             ]
    #         }
    #     }
