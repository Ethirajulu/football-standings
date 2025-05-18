import axios from 'axios';

describe('GET /api/teams', () => {
  it('should return a list of teams for a valid leagueId', async () => {
    const response = await axios.get(`/api/teams?leagueId=101`);
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
    if (response.data.length > 0) {
      expect(response.data[0]).toHaveProperty('id'); // Assuming DTO maps team_key to id
      expect(response.data[0]).toHaveProperty('name');
      expect(response.data[0].name).toBe('Mock Team Alpha');
    }
  });

  it('should return an empty list for a leagueId with no mocked teams', async () => {
    const response = await axios.get(`/api/teams?leagueId=999`);
    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);
  });
});

describe('GET /api/teams/position', () => {
  it('should return standing for a valid leagueId and teamId', async () => {
    const response = await axios.get(
      `/api/teams/position?leagueId=101&teamId=3001`
    );
    expect(response.status).toBe(200);
    // Assuming StandingResponseDto structure
    expect(response.data).toHaveProperty('teamId', '3001');
    expect(response.data).toHaveProperty('position', '1');
    expect(response.data).toHaveProperty('name', 'Mock Team Alpha');
  });

  // Add test for team not found in standings if applicable by your mock logic
  it('should return 404 or appropriate error if team standing not found for a league', async () => {
    // This depends on how your backend and mock handlers are set up for missing standings
    // For now, assuming the mock for get_standings returns an array, and the backend filters it.
    // If the backend is expected to throw an error, adjust the test.
    try {
      await axios.get(`/api/teams/position?leagueId=101&teamId=9999`); // 9999 is a non-existent teamId
    } catch (error: any) {
      expect(error.response.status).toBe(404); // Or whatever your backend returns
    }
  });
});
