import { Page, Route } from '@playwright/test';
// Import actual types from your shared library
import type { Country, League, Team, Standing } from '@sapient-fc/shared'; // Adjust path if necessary based on tsconfig paths

// Use the actual types from the shared library directly
type MockCountry = Country;
type MockLeague = League;
type MockTeam = Team;
type MockStanding = Standing;

/**
 * Mocks the GET /api/countries endpoint.
 * @param page The Playwright page object.
 * @param countries The array of mock countries to return. If not provided, a default mock will be used.
 */
export async function mockGetCountries(page: Page, countries?: MockCountry[]) {
  const mockCountriesResponse = countries || [
    {
      id: '1',
      name: 'England',
      logo: 'england.png',
      _links: {
        self: { href: '/api/countries/1' },
        leagues: { href: '/api/leagues?countryId=1' },
      },
    },
    {
      id: '2',
      name: 'Spain',
      logo: 'spain.png',
      _links: {
        self: { href: '/api/countries/2' },
        leagues: { href: '/api/leagues?countryId=2' },
      },
    },
    {
      id: '3',
      name: 'Germany',
      logo: 'germany.png',
      _links: {
        self: { href: '/api/countries/3' },
        leagues: { href: '/api/leagues?countryId=3' },
      },
    },
    // Add more mock countries as needed
  ];
  await page.route('**/api/countries', (route: Route) => {
    if (route.request().method() === 'GET') {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        json: mockCountriesResponse,
      });
    }
  });
}

/**
 * Mocks the GET /api/leagues?countryId= endpoint.
 * @param page The Playwright page object.
 * @param countryId The ID of the country for which to mock leagues.
 * @param leagues The array of mock leagues to return. If not provided, a default mock will be used.
 */
export async function mockGetLeaguesForCountry(
  page: Page,
  countryId: string,
  leagues?: MockLeague[]
) {
  const defaultLeagues: Record<string, MockLeague[]> = {
    '1': [
      // Assuming '1' is the ID for England
      {
        id: '101',
        name: 'Premier League',
        logo: 'premier_league.png',
        _links: {
          self: { href: '/api/leagues/101' },
          teams: { href: '/api/teams?leagueId=101' },
        },
      },
      {
        id: '102',
        name: 'Championship',
        logo: 'championship.png',
        _links: {
          self: { href: '/api/leagues/102' },
          teams: { href: '/api/teams?leagueId=102' },
        },
      },
    ],
    '2': [
      // Assuming '2' is the ID for Spain
      {
        id: '201',
        name: 'La Liga',
        logo: 'la_liga.png',
        _links: {
          self: { href: '/api/leagues/201' },
          teams: { href: '/api/teams?leagueId=201' },
        },
      },
    ],
    // Add more mock leagues for other country IDs as needed
  };

  const mockLeaguesResponse = leagues || defaultLeagues[countryId] || [];

  await page.route(`**/api/leagues?countryId=${countryId}`, (route: Route) => {
    if (route.request().method() === 'GET') {
      // Ensure the request matches exactly if other query params might exist
      const url = new URL(route.request().url());
      if (url.searchParams.get('countryId') === countryId) {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          json: mockLeaguesResponse,
        });
      } else {
        route.continue(); // Important: let other routes or actual network for non-matching calls
      }
    } else {
      route.continue();
    }
  });
}

/**
 * Mocks the GET /api/teams?leagueId= endpoint.
 * @param page The Playwright page object.
 * @param leagueId The ID of the league for which to mock teams.
 * @param teams The array of mock teams to return. If not provided, a default mock will be used.
 */
export async function mockGetTeamsForLeague(
  page: Page,
  leagueId: string,
  teams?: MockTeam[]
) {
  const defaultTeams: Record<string, MockTeam[]> = {
    '101': [
      // Assuming '101' is Premier League
      {
        id: '1001',
        name: 'Arsenal',
        logo: 'arsenal.png',
        _links: {
          self: { href: '/api/teams/1001' },
          standing: { href: '/api/standings/1001' },
        },
      },
      {
        id: '1002',
        name: 'Chelsea',
        logo: 'chelsea.png',
        _links: {
          self: { href: '/api/teams/1002' },
          standing: { href: '/api/standings/1002' },
        },
      },
    ],
    '201': [
      // Assuming '201' is La Liga
      {
        id: '2001',
        name: 'Barcelona',
        logo: 'barcelona.png',
        _links: {
          self: { href: '/api/teams/2001' },
          standing: { href: '/api/standings/2001' },
        },
      },
    ],
    // Add more mock teams for other league IDs as needed
  };

  const mockTeamsResponse = teams || defaultTeams[leagueId] || [];

  await page.route(`**/api/teams?leagueId=${leagueId}`, (route: Route) => {
    if (route.request().method() === 'GET') {
      const url = new URL(route.request().url());
      if (url.searchParams.get('leagueId') === leagueId) {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          json: mockTeamsResponse,
        });
      } else {
        route.continue();
      }
    } else {
      route.continue();
    }
  });
}

/**
 * Mocks the GET /api/standings/:teamId endpoint.
 * @param page The Playwright page object.
 * @param teamId The ID of the team for which to mock the standing.
 * @param standing The mock standing object to return. If not provided, a default mock will be used.
 */
export async function mockGetStandingForTeam(
  page: Page,
  teamId: string,
  standing?: MockStanding
) {
  const defaultStandings: Record<string, MockStanding> = {
    '1001': {
      teamId: '1001',
      position: 1,
      _links: { self: { href: '/api/standings/1001' } },
    }, // Arsenal
    '1002': {
      teamId: '1002',
      position: 3,
      _links: { self: { href: '/api/standings/1002' } },
    }, // Chelsea
    '2001': {
      teamId: '2001',
      position: 2,
      _links: { self: { href: '/api/standings/2001' } },
    }, // Barcelona
    // Add more mock standings for other team IDs as needed
  };

  const mockStandingResponse = standing ||
    defaultStandings[teamId] || {
      teamId,
      position: 0,
      _links: { self: { href: `/api/standings/${teamId}` } },
    }; // Default if not found

  await page.route(`**/api/standings/${teamId}`, (route: Route) => {
    if (route.request().method() === 'GET') {
      // Check if the URL ends with /api/standings/:teamId
      const urlPath = new URL(route.request().url()).pathname;
      if (urlPath === `/api/standings/${teamId}`) {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          json: mockStandingResponse,
        });
      } else {
        route.continue();
      }
    } else {
      route.continue();
    }
  });
}

// Add more mock functions here for other endpoints if needed
