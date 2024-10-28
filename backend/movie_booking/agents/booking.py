from swarm import Agent
from typing import List, Dict
from ..common.logger import log_function


class BookingAgent(Agent):
    def __init__(self, websocket):
        super().__init__(
            name="Booking",
            instructions="""あなたは映画チケットの予約専門エージェントです。
            映画館、上映時間、座席の予約管理を担当します。
            
            「予約を実行して」と要求されたら、make_reservationをコールして結果を返すこと

            主な責務：
            1. make_reservation(予約を実行)
            2. cancel_reservation(予約のキャンセル)
            """,
            functions=[
                self.transfer_back_to_planner,
                # self.check_availability,
                # self.get_seating_chart,
                self.make_reservation,
                self.cancel_reservation,
                # self.modify_reservation,
                # self.get_reservation_details
            ]
        )
        self._websocket = websocket
    
    def transfer_back_to_planner(self):
        """プランナーエージェントに戻る"""
        from .planner import PlannerAgent
        return PlannerAgent(self._websocket)

    # def check_availability(self, theater_id: int, movie_id: int, showtime: str):
    #     """特定の上映回の空席状況を確認"""
    #     availability_data = {
    #         "theater_id": theater_id,
    #         "movie_id": movie_id,
    #         "showtime": showtime,
    #         "screen": "IMAX 1",
    #         "total_seats": 200,
    #         "available_seats": 45,
    #         "seat_types": {
    #             "premium": 10,
    #             "standard": 30,
    #             "wheelchair": 5
    #         },
    #         "price_info": {
    #             "premium": 2200,
    #             "standard": 1800,
    #             "senior": 1100,
    #             "student": 1400
    #         }
    #     }
    #     return {
    #         "status": "success",
    #         "data": availability_data
    #     }
    
    # def get_seating_chart(self, theater_id: int, screen: str, showtime: str):
    #     """座席表と予約状況を取得"""
    #     seating_chart = {
    #         "screen_layout": {
    #             "rows": 15,
    #             "cols": 20,
    #             "premium_rows": ["H", "I", "J"],
    #             "wheelchair_positions": ["A1", "A2"]
    #         },
    #         "unavailable_seats": ["H10", "H11", "I10", "I11"],
    #         "seat_types": {
    #             "premium": ["H1", "H2", "I1", "I2"],
    #             "standard": ["A1", "A2", "B1", "B2"],
    #             "wheelchair": ["W1", "W2"]
    #         },
    #         "recommended_seats": {
    #             "couples": ["H10", "H11"],
    #             "groups": ["E5", "E6", "E7", "E8"],
    #             "wheelchair": ["W1"]
    #         }
    #     }
    #     return {
    #         "status": "success",
    #         "data": seating_chart
        # }
    
    def make_reservation(self, 
                        theater_id: int, 
                        movie_id: int, 
                        showtime: str, 
                        seats: List[str], 
                        ticket_types: Dict[str, int],
                        customer_info: Dict):
        """予約を実行"""
        reservation = {
            "reservation_id": "RSV-2024-001",
            "status": "confirmed",
            "theater": {
                "id": theater_id,
                "name": "TOHOシネマズ 日比谷",
                "screen": "IMAX 1"
            },
            "movie": {
                "id": movie_id,
                "title": "DUNE：パート2"
            },
            "showtime": showtime,
            "seats": seats,
            "tickets": ticket_types,
            "total_amount": 5400,
            "payment_status": "pending",
            "payment_due": "2024-10-25T23:59:59+09:00",
            "qr_code": "https://example.com/qr/RSV-2024-001",
            "customer": customer_info
        }
        return {
            "status": "success",
            "data": reservation
        }
    
    def cancel_reservation(self, reservation_id: str):
        """予約をキャンセル"""
        return {
            "status": "success",
            "data": {
                "reservation_id": reservation_id,
                "cancellation_id": "CXL-2024-001",
                "refund_amount": 5400,
                "refund_status": "processing",
                "cancelled_at": "2024-10-24T15:30:00+09:00"
            }
        }
    
    # def modify_reservation(self, 
    #                      reservation_id: str, 
    #                      changes: Dict):
    #     """予約内容を変更"""
    #     return {
    #         "status": "success",
    #         "data": {
    #             "reservation_id": reservation_id,
    #             "modification_id": "MOD-2024-001",
    #             "old_details": {
    #                 "showtime": "18:30",
    #                 "seats": ["H10", "H11"]
    #             },
    #             "new_details": {
    #                 "showtime": "21:00",
    #                 "seats": ["I10", "I11"]
    #             },
    #             "price_difference": 0,
    #             "modified_at": "2024-10-24T15:30:00+09:00"
    #         }
    #     }
    
    # def get_reservation_details(self, reservation_id: str):
    #     """予約詳細を取得"""
    #     return {
    #         "status": "success",
    #         "data": {
    #             "reservation_id": reservation_id,
    #             "created_at": "2024-10-24T12:00:00+09:00",
    #             "status": "confirmed",
    #             "details": {
    #                 "theater_id": 1,
    #                 "movie_id": 1,
    #                 "showtime": "21:00",
    #                 "seats": ["H10", "H11"],
    #                 "ticket_types": {
    #                     "adult": 2
    #                 }
    #             },
    #             "payment_status": "completed",
    #             "total_amount": 5400
    #         }
    #     }
