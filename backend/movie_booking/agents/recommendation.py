from swarm import Agent
from ..common.logger import log_function

class RecommendationAgent(Agent):
    def __init__(self, websocket):
        super().__init__(
            name="Recommendation",
            instructions="""あなたは映画推薦の専門家です。
            ユーザーの好みやスケジュールを考慮して、最適な映画を推薦してください。
            
            評価基準:
            1. ジャンル適合度 (30点)
            - 好みのジャンルとの一致度
            - 過去の視聴履歴との関連性
            
            2. スケジュール適合度 (25点)
            - 上映時間とスケジュールの整合性
            - 映画の長さと空き時間の関係
            
            3. 映画特性 (25点)
            - 年齢制限との適合性
            - IMAX/3D等の上映形式の好み
            - 字幕/吹替の好み
            
            4. その他要因 (20点)
            - 評価スコア
            - 混雑度
            - 座席の空き状況
            """,
            functions=[
                self.transfer_back_to_planner,
                # self.get_movie_details,
                # self.analyze_preferences,
                # self.generate_rankings
            ]
        )
        self._websocket = websocket

    
    @log_function
    # def get_movie_details(self, movie_id: int):
    #     movies_data = {
    #         1: {
    #             "id": 1,
    #             "title": "DUNE：パート2",
    #             "genre": ["SF", "アクション"],
    #             "rating": "PG12",
    #             "duration": 166,
    #             "formats": ["IMAX", "2D"],
    #             "languages": ["字幕", "吹替"],
    #             "reviews_score": 4.8,
    #             "synopsis": "...",
    #             "release_date": "2024-03-01"
    #         }
    #     }
    #     return {
    #         "status": "success",
    #         "data": movies_data.get(movie_id, {"error": "Movie not found"})
    #     }

    @log_function
    def transfer_back_to_planner(self):
        """プランナーエージェントに戻る"""
        from .planner import PlannerAgent
        return PlannerAgent(self._websocket)

    # @log_function
    # def analyze_preferences(self, movies: list, persona: dict, schedule: dict):
    #     analysis_result = {
    #         "movie_scores": [
    #             {
    #                 "movie_id": 1,
    #                 "title": "DUNE：パート2",
    #                 "total_score": 92,
    #                 "breakdown": {
    #                     "genre_match": 28,  # 30点満点
    #                     "schedule_fit": 23,  # 25点満点
    #                     "movie_features": 22,  # 25点満点
    #                     "other_factors": 19   # 20点満点
    #                 },
    #                 "reasons": [
    #                     "SFとアクションの組み合わせが好みに合致",
    #                     "IMAXでの視聴が可能",
    #                     "字幕版の上映時間がスケジュールに適合"
    #                 ]
    #             }
    #         ]
    #     }
    #     return {
    #         "status": "success",
    #         "data": analysis_result
    #     }
    
    #@log_function
    # def generate_rankings(self, analysis_result: dict, criteria: list = None):
    #     return {
    #         "status": "success",
    #         "data": {
    #             "rankings": [
    #                 {
    #                     "rank": 1,
    #                     "movie_id": 1,
    #                     "title": "DUNE：パート2",
    #                     "score": 92,
    #                     "recommended_showtime": "21:00",
    #                     "recommendation_reason": "ジャンル適合性とスケジュール適合性が高く、IMAXでの視聴も可能です。"
    #                 }
    #             ],
    #             "ranking_criteria": criteria or ["総合スコア"]
    #         }
    #     }