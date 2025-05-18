import { test, expect } from '@playwright/test';
import { mockGetCountries, mockGetLeaguesForCountry } from './mocks/apiMocks';

test.describe('Frontend Application Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the root of the application before each test
    await page.goto('/');
  });

  test('should load the main page and have a specific title', async ({
    page,
  }) => {
    // Replace 'Expected Page Title' with the actual title of your application
    await expect(page).toHaveTitle(/Frontend/);
    // You can also add checks for visible elements, e.g.:
    // await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
  });

  // We can add more tests here for country selection, league selection, etc.

  test.describe('Scenario 1: Country and League Selection', () => {
    test('should allow user to select a country and then a league', async ({
      page,
    }) => {
      // Mock API responses
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
        {
          id: '2',
          name: 'Spain',
          logo: 'spain.png',
          _links: {
            self: { href: '/api/countries/2' },
            leagues: { href: '/api/leagues?countryId=2' },
          },
        },
      ]);
      // Mock leagues for England (countryId: '1')
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
        {
          id: '102',
          name: 'Championship',
          logo: 'championship.png',
          _links: {
            self: { href: '/api/leagues/102' },
            teams: { href: '/api/teams?leagueId=102' },
          },
        },
      ]);
      // Mock leagues for Spain (countryId: '2')
      await mockGetLeaguesForCountry(page, '2', [
        {
          id: '201',
          name: 'La Liga',
          logo: 'la_liga.png',
          _links: {
            self: { href: '/api/leagues/201' },
            teams: { href: '/api/teams?leagueId=201' },
          },
        },
      ]);

      await page.goto('/'); // Navigate after mocks are set up

      // 1. Select a country
      const countrySelectComponent = page.getByTestId(
        'country-selector-select'
      ); // data-testid of the Select component
      await expect(countrySelectComponent).toBeVisible();

      // Click the button inside the Select component to open the dropdown
      await countrySelectComponent.getByRole('button').click();

      // Click the option with the text "England"
      // The options are li elements inside a ul
      await countrySelectComponent
        .getByRole('listitem')
        .filter({ hasText: 'England' })
        .click();

      // 2. Select a league
      const leagueSelectComponent = page.getByTestId('league-selector-select'); // data-testid of the Select component
      await expect(leagueSelectComponent).toBeVisible();

      // Click the button inside the Select component to open the dropdown
      await leagueSelectComponent.getByRole('button').click();

      // Wait for league options to be populated and click "Premier League"
      // The options are li elements inside a ul
      const premierLeagueOption = leagueSelectComponent
        .getByRole('listitem')
        .filter({ hasText: 'Premier League' });
      await expect(premierLeagueOption).toBeVisible({ timeout: 5000 });
      await premierLeagueOption.click();

      // 3. Verify selection
      // Check if the button text reflects the selected country name
      await expect(
        countrySelectComponent.getByRole('button').getByText('England')
      ).toBeVisible();

      // Check if the button text reflects the selected league name
      await expect(
        leagueSelectComponent.getByRole('button').getByText('Premier League')
      ).toBeVisible();

      // Add more assertions as needed based on your UI
    });
  });
});
