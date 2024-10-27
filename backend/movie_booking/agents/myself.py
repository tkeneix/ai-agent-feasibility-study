from swarm import Agent
from ..common.logger import log_function


class MySelfAgent(Agent):
    def __init__(self):
        super().__init__(
            name="MySelf",
            instructions="""あなたは映画鑑賞者本人の情報を管理するエージェントです。
            ユーザーのペルソナ情報やスケジュール情報を提供します。
            """,
            functions=[
                self.transfer_back_to_planner,
                self.get_location,
                self.get_persona,
                self.get_schedule
            ]
        )

    def transfer_back_to_planner(self):
        """プランナーエージェントに戻る"""
        from .planner import PlannerAgent
        return PlannerAgent()    

    def get_location(self):
        return {
            "lat": 35.6812,
            "lng": 139.7671,
            "address": "東京都千代田区丸の内"
        }
    
    def get_persona(self):
        return {
            "favoriteGenres": ["アクション", "SF", "アニメーション"],
            "ageRating": ["G", "PG12", "R15+"],
            "preferredShowtime": "夜間",
            "preferredSeatingArea": "中央",
            "movieFrequency": "月2回程度",
            "preferences": {
                "subtitles": True,
                "dubbed": False,
                "3D": False,
                "IMAX": True
            }
        }
    
    def get_schedule(self):
        return {
            "availableDays": ["2024-10-26", "2024-10-27"],
            "availableTimeSlots": ["18:00-23:00"],
            "preferredDuration": {
                "min": 90,
                "max": 180
            },
            "blockedTimes": [
                {
                    "date": "2024-10-26",
                    "time": "19:00-20:00",
                    "reason": "dinner plans"
                }
            ]
        }
