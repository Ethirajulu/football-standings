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
    expect(response.data).toHaveProperty('teamId', '3001');
    expect(response.data).toHaveProperty('position', '1');
    expect(response.data).toHaveProperty('name', 'Mock Team Alpha');
  });

  // Add test for team not found in standings if applicable by your mock logic
  it('should return 404 or appropriate error if team standing not found for a league', async () => {
    try {
      await axios.get(`/api/teams/position?leagueId=101&teamId=9999`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
});
