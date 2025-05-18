import { http, HttpResponse } from 'msw';

// This is the base URL where your MSW mock server will listen.
// Your backend application's API_FOOTBALL_API_HOST environment variable
// should be set to this URL during E2E tests.
const MOCK_API_HOST = 'http://localhost:1234';

export const handlers = [
  http.get(`${MOCK_API_HOST}/`, ({ request }) => {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    const apiKey = url.searchParams.get('APIkey');

    // Handler for get_countries
    if (action === 'get_countries' && apiKey) {
      return HttpResponse.json([
        {
          country_id: '1',
          country_name: 'Mock Country 1',
          country_logo: 'logo1.png',
        },
        {
          country_id: '2',
          country_name: 'Mock Country 2',
          country_logo: 'logo2.png',
        },
      ]);
    }
    // Fallback for unhandled actions on this path if not get_countries
    // return new HttpResponse(null, { status: 404 }); // This was too broad, let other handlers try
    return;
  }),

  http.get(`${MOCK_API_HOST}/`, ({ request }) => {
    const url = new URL(request.url);
    const action = url.searchParams.get('action');
    const countryId = url.searchParams.get('country_id');
    const leagueId = url.searchParams.get('league_id'); // For get_teams and get_standings
    const apiKey = url.searchParams.get('APIkey');

    // Handler for get_leagues
    if (action === 'get_leagues' && countryId && apiKey) {
      if (countryId === '1') {
        // Example: only mock for country_id '1'
        return HttpResponse.json([
          {
            league_id: '101',
            league_name: 'Mock League A for Country 1',
            country_id: '1',
            country_name: 'Mock Country 1',
            league_logo: 'leagueA.png',
            league_season: '2025',
          },
        ]);
      }
      return HttpResponse.json([]); // Return empty for other country IDs or add more specific mocks
    }

    // Handler for get_teams
    if (action === 'get_teams' && leagueId && apiKey) {
      if (leagueId === '101') {
        // Example: only mock for league_id '101'
        return HttpResponse.json([
          {
            team_key: '3001',
            team_name: 'Mock Team Alpha',
            team_badge: 'teamA.png',
            // league_id: '101' // usually part of the response from API Football
          },
          {
            team_key: '3002',
            team_name: 'Mock Team Beta',
            team_badge: 'teamB.png',
            // league_id: '101'
          },
        ]);
      }
      return HttpResponse.json([]); // Return empty for other league IDs
    }

    // Handler for get_standings
    if (action === 'get_standings' && leagueId && apiKey) {
      if (leagueId === '101') {
        // Example: only mock for league_id '101'
        return HttpResponse.json([
          {
            league_id: '101',
            country_name: 'Mock Country 1',
            league_name: 'Mock League A for Country 1',
            team_id: '3001', // Corresponds to team_key from get_teams
            team_name: 'Mock Team Alpha',
            overall_league_position: '1',
            overall_league_payed: '10',
            overall_league_W: '8',
            overall_league_D: '1',
            overall_league_L: '1',
            overall_league_GF: '20',
            overall_league_GA: '5',
            overall_league_PTS: '25',
            team_badge: 'teamA.png',
            // ... other standing properties
          },
          {
            league_id: '101',
            country_name: 'Mock Country 1',
            league_name: 'Mock League A for Country 1',
            team_id: '3002',
            team_name: 'Mock Team Beta',
            overall_league_position: '2',
            overall_league_payed: '10',
            overall_league_W: '7',
            overall_league_D: '2',
            overall_league_L: '1',
            overall_league_GF: '18',
            overall_league_GA: '6',
            overall_league_PTS: '23',
            team_badge: 'teamB.png',
          },
        ]);
      }
      return HttpResponse.json([]); // Return empty for other league IDs
    }

    // If no specific action matched within this combined handler
    return new HttpResponse(null, { status: 404 });
  }),
];
