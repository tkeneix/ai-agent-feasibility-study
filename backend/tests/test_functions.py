import pytest
from movie_booking.functions.location import LocationFunction
from movie_booking.functions.nearby_search import NearbySearchFunction
from movie_booking.functions.persona import PersonaFunction
from movie_booking.functions.schedule import ScheduleFunction
from swarm import Swarm

@pytest.fixture
def swarm():
    return Swarm()

@pytest.mark.asyncio
async def test_location_function(swarm):
    func = LocationFunction(swarm)
    result = await func.run()
    
    assert isinstance(result, dict)
    assert "lat" in result
    assert "lng" in result
    assert isinstance(result["lat"], float)
    assert isinstance(result["lng"], float)

@pytest.mark.asyncio
async def test_nearby_search_function(swarm):
    func = NearbySearchFunction(swarm)
    result = await func.run(35.6812, 139.7671, "movie_theater", 3)
    
    assert isinstance(result, list)
    assert len(result) <= 3
    assert all("id" in theater for theater in result)
    assert all("name" in theater for theater in result)
    assert all("distance" in theater for theater in result)

@pytest.mark.asyncio
async def test_persona_function(swarm):
    func = PersonaFunction(swarm)
    result = await func.run()
    
    assert isinstance(result, dict)
    assert "favoriteGenres" in result
    assert "ageRating" in result
    assert "preferredShowtime" in result

@pytest.mark.asyncio
async def test_schedule_function(swarm):
    func = ScheduleFunction(swarm)
    result = await func.run()
    
    assert isinstance(result, dict)
    assert "availableDays" in result
    assert "availableTimeSlots" in result
    assert isinstance(result["availableDays"], list)
    assert isinstance(result["availableTimeSlots"], list)