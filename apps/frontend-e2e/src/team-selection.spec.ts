import { test, expect } from '@playwright/test';
import {
  mockGetCountries,
  mockGetLeaguesForCountry,
  mockGetTeamsForLeague,
  mockGetStandingForTeam,
} from './mocks/apiMocks';

test.describe('Scenario 2: Team Selection and Standing Display', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses for a typical flow
    await mockGetCountries(page, [
      {
        id: '1',
        name: 'England',
        logo: 'england.png',
        _links: {
          self: { href: '/api/countries/1' },
          leagues: { href: '/api/leagues?countryId=1' },
        },
      },
    ]);
    await mockGetLeaguesForCountry(page, '1', [
      {
        id: '101',
        name: 'Premier League',
        logo: 'premier_league.png',
        _links: {
          self: { href: '/api/leagues/101' },
          teams: { href: '/api/teams?leagueId=101' },
        },
      },
    ]);
    await mockGetTeamsForLeague(page, '101', [
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
    ]);
    await mockGetStandingForTeam(page, '1001', {
      teamId: '1001',
      position: 1,
      _links: { self: { href: '/api/standings/1001' } },
    });
    await mockGetStandingForTeam(page, '1002', {
      teamId: '1002',
      position: 3,
      _links: { self: { href: '/api/standings/1002' } },
    });

    await page.goto('/');
  });

  test('should allow user to select country, league, team, and see standing', async ({
    page,
  }) => {
    // 1. Select Country: England
    const countrySelect = page.getByTestId('country-selector-select');
    await countrySelect.getByRole('button').click();
    await countrySelect
      .getByRole('listitem')
      .filter({ hasText: 'England' })
      .click();
    await expect(
      countrySelect.getByRole('button').getByText('England')
    ).toBeVisible();

    // 2. Select League: Premier League
    const leagueSelect = page.getByTestId('league-selector-select');
    await leagueSelect.getByRole('button').click();
    const premierLeagueOption = leagueSelect
      .getByRole('listitem')
      .filter({ hasText: 'Premier League' });
    await expect(premierLeagueOption).toBeVisible({ timeout: 5000 });
    await premierLeagueOption.click();
    await expect(
      leagueSelect.getByRole('button').getByText('Premier League')
    ).toBeVisible();

    // 3. Select Team: Arsenal
    //    (Assuming a select element with data-testid 'team-selector-select')
    const teamSelect = page.getByTestId('team-selector-select'); // Replace with actual selector if different
    await expect(teamSelect).toBeVisible();
    await teamSelect.getByRole('button').click();
    const arsenalOption = teamSelect
      .getByRole('listitem')
      .filter({ hasText: 'Arsenal' });
    await expect(arsenalOption).toBeVisible({ timeout: 5000 });
    await arsenalOption.click();
    await expect(
      teamSelect.getByRole('button').getByText('Arsenal')
    ).toBeVisible();

    // 4. Verify Standing is displayed
    //    (Assuming standing is displayed in an element with data-testid 'team-standing-display')
    const standingDisplay = page.getByTestId('team-position'); // Replace with actual selector
    await expect(standingDisplay).toBeVisible();
    // Example: Check if the standing display contains the position
    // Adjust the text based on how your application formats the standing
    await expect(standingDisplay).toContainText('League Position: 1');
  });

  // Add more tests for different teams, or scenarios like no standing data, etc.
});
