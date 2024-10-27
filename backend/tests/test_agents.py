import pytest
from movie_booking.agents.planner import PlannerAgent
from movie_booking.agents.recommendation import RecommendationAgent
from swarm import Swarm

@pytest.fixture
def swarm():
    return Swarm()

@pytest.mark.asyncio
async def test_planner_agent(swarm):
    planner = PlannerAgent(swarm)
    result = await planner.run("近くの映画館を探して")
    
    assert isinstance(result, dict)
    assert "action" in result
    assert "params" in result
    assert "reason" in result
    assert result["action"] == "search_theaters"

@pytest.mark.asyncio
async def test_recommendation_agent(swarm):
    agent = RecommendationAgent(swarm)
    
    movies = [
        {
            "id": 1,
            "title": "テスト映画",
            "genre": ["アクション"],
            "rating": "PG12",
            "availableShowtimes": ["18:00"]
        }
    ]
    
    persona = {
        "favoriteGenres": ["アクション"],
        "ageRating": ["PG12"],
        "preferredShowtime": "夜間"
    }
    
    schedule = {
        "availableDays": ["2024-10-26"],
        "availableTimeSlots": ["18:00-23:00"]
    }
    
    result = await agent.run(movies, persona, schedule)
    
    assert isinstance(result, dict)
    assert "recommendations" in result
    assert len(result["recommendations"]) > 0
    assert "movie_id" in result["recommendations"][0]
    assert "score" in result["recommendations"][0]
