import axios from 'axios';

describe('GET /api/countries', () => {
  it('should return a list of countries', async () => {
    const response = await axios.get(`/api/countries`);
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(Array);
    if (response.data.length > 0) {
      expect(response.data[0]).toHaveProperty('id');
      expect(response.data[0]).toHaveProperty('name');
    }
  });
});
