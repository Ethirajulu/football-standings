/// <reference types="vitest/globals" />
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PositionDisplay } from './position-display';
import { Country, League, Team } from '@sapient-fc/shared';
import '@testing-library/jest-dom';

const { mockUseQueryFn } = vi.hoisted(() => {
  return { mockUseQueryFn: vi.fn() };
});
const { mockGetFootballDataFn } = vi.hoisted(() => {
  return { mockGetFootballDataFn: vi.fn() };
});

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: mockUseQueryFn,
  };
});

vi.mock('@/lib/apis', () => ({
  getFootballData: mockGetFootballDataFn,
}));

const mockCountry: Country = {
  id: '1',
  name: 'Wonderland',
  logo: 'country.png',
  _links: {
    self: { href: '/countries/1' },
    leagues: { href: '/countries/1/leagues' },
  },
};

const mockLeague: League = {
  id: 'L1',
  name: 'Mad Tea League',
  logo: 'league.png',
  _links: {
    self: { href: '/leagues/L1' },
    teams: { href: '/leagues/L1/teams' },
  },
};

const mockTeam: Team = {
  id: 'T1',
  name: 'Cheshire Cats FC',
  logo: 'team.png',
  _links: {
    self: { href: '/teams/T1' },
    standing: { href: '/standings/T1' },
  },
};

describe('PositionDisplay', () => {
  beforeEach(() => {
    mockGetFootballDataFn.mockReset();
    mockUseQueryFn.mockReset();

    mockUseQueryFn.mockImplementation(async (options) => {
      try {
        const data = await options.queryFn();
        return { data, isLoading: false, isError: false, isSuccess: true };
      } catch (error) {
        return {
          data: undefined,
          isLoading: false,
          isError: true,
          error,
          isSuccess: false,
        };
      }
    });
  });

  it('should render country, league, and team information', async () => {
    const expectedPositionData = { position: 5 };
    mockUseQueryFn.mockReturnValue({
      data: expectedPositionData,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    render(
      <PositionDisplay
        country={mockCountry}
        league={mockLeague}
        team={mockTeam}
      />
    );

    expect(screen.getByTestId('country-name')).toHaveTextContent('Wonderland');
    expect(screen.getByTestId('country-logo')).toHaveAttribute(
      'src',
      'country.png'
    );
    expect(screen.getByTestId('league-name')).toHaveTextContent(
      'Mad Tea League'
    );
    expect(screen.getByTestId('league-logo')).toHaveAttribute(
      'src',
      'league.png'
    );
    expect(screen.getByTestId('team-name')).toHaveTextContent(
      'Cheshire Cats FC'
    );
    expect(screen.getByTestId('team-logo')).toHaveAttribute('src', 'team.png');

    await waitFor(() => {
      expect(screen.getByTestId('team-position')).toHaveTextContent(
        `League Position: ${expectedPositionData.position}`
      );
    });
  });

  it('should render without logos if not provided (empty string)', async () => {
    const expectedPositionData = { position: 10 };

    mockUseQueryFn.mockReturnValue({
      data: expectedPositionData,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    const countryWithoutLogo: Country = { ...mockCountry, logo: '' };
    const leagueWithoutLogo: League = { ...mockLeague, logo: '' };
    const teamWithoutLogo: Team = { ...mockTeam, logo: '' };

    render(
      <PositionDisplay
        country={countryWithoutLogo}
        league={leagueWithoutLogo}
        team={teamWithoutLogo}
      />
    );

    expect(screen.queryByTestId('country-logo')).not.toBeInTheDocument();
    expect(screen.queryByTestId('league-logo')).not.toBeInTheDocument();
    expect(screen.queryByTestId('team-logo')).not.toBeInTheDocument();

    expect(screen.getByTestId('country-name')).toHaveTextContent('Wonderland');
    expect(screen.getByTestId('league-name')).toHaveTextContent(
      'Mad Tea League'
    );
    expect(screen.getByTestId('team-name')).toHaveTextContent(
      'Cheshire Cats FC'
    );
    await waitFor(() => {
      expect(screen.getByTestId('team-position')).toHaveTextContent(
        `League Position: ${expectedPositionData.position}`
      );
    });
  });

  it('should display position when data is fetched', async () => {
    const expectedPositionData = { position: 3 };

    mockUseQueryFn.mockReturnValue({
      data: expectedPositionData,
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    render(
      <PositionDisplay
        country={mockCountry}
        league={mockLeague}
        team={mockTeam}
      />
    );

    await waitFor(() => {
      expect(screen.getByTestId('team-position')).toHaveTextContent(
        `League Position: ${expectedPositionData.position}`
      );
    });
  });

  it('should display "League Position:" if position is not available initially', () => {
    mockGetFootballDataFn.mockReturnValue(
      new Promise((_resolve, _reject) => {
        /* intentionally non-resolving */
      })
    );
    mockUseQueryFn.mockImplementation((options) => {
      options.queryFn();
      return {
        data: undefined,
        isLoading: true,
        isError: false,
      };
    });

    render(
      <PositionDisplay
        country={mockCountry}
        league={mockLeague}
        team={mockTeam}
      />
    );

    expect(screen.getByTestId('team-position')).toHaveTextContent(
      'League Position:'
    );
  });
});
