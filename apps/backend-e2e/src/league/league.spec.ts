import axios from 'axios';

describe('GET /api/leagues', () => {
  it('should return a list of leagues for a valid countryId', async () => {
    const response = await axios.get(`/api/leagues?countryId=1`);
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
    if (response.data.length > 0) {
      expect(response.data[0]).toHaveProperty('id'); // Assuming DTO maps league_id to id
      expect(response.data[0]).toHaveProperty('name');
      expect(response.data[0].name).toBe('Mock League A for Country 1');
    }
  });

  it('should return an empty list for a countryId with no mocked leagues', async () => {
    const response = await axios.get(`/api/leagues?countryId=999`); // Assuming 999 is not specifically mocked
    expect(response.status).toBe(200);
    expect(response.data).toEqual([]);
  });
});
