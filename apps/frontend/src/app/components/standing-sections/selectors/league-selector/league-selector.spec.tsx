/// <reference types="vitest/globals" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LeagueSelector } from './league-selector';
import { Country, League } from '@sapient-fc/shared';
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

vi.mock('@/lib/apis', async () => {
  const actual = await vi.importActual('@/lib/apis');
  return {
    ...actual,
    getFootballData: mockGetFootballDataFn,
  };
});

const mockCountry: Country = {
  id: '1',
  name: 'Wonderland',
  logo: 'country.png',
  _links: {
    self: { href: '/countries/1' },
    leagues: { href: '/countries/1/leagues' },
  },
};

const mockLeagues: League[] = [
  {
    id: 'L1',
    name: 'Mad Tea League',
    logo: 'league1.png',
    _links: {
      self: { href: '/leagues/L1' },
      teams: { href: '/leagues/L1/teams' },
    },
  },
  {
    id: 'L2',
    name: 'Queen of Hearts Cup',
    logo: 'league2.png',
    _links: {
      self: { href: '/leagues/L2' },
      teams: { href: '/leagues/L2/teams' },
    },
  },
];

describe('LeagueSelector', () => {
  beforeEach(() => {
    mockUseQueryFn.mockReset();
    mockGetFootballDataFn.mockReset();
  });

  it('should render a select with leagues when a country is selected', async () => {
    mockGetFootballDataFn.mockResolvedValue(mockLeagues);
    mockUseQueryFn.mockReturnValue({
      data: mockLeagues,
      isLoading: false,
      isError: false,
    });

    render(
      <LeagueSelector
        country={mockCountry}
        leagueId={undefined}
        setLeague={vi.fn()}
      />
    );

    const selectButton = screen.getByTestId('league-selector-select');
    expect(selectButton).toBeInTheDocument();
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('should call setLeague when a league is selected', async () => {
    mockGetFootballDataFn.mockResolvedValue(mockLeagues);
    mockUseQueryFn.mockReturnValue({
      data: mockLeagues,
      isLoading: false,
      isError: false,
    });
    const handleSetLeague = vi.fn();
    render(
      <LeagueSelector
        country={mockCountry}
        leagueId={undefined}
        setLeague={handleSetLeague}
      />
    );

    const selectButton = screen.getByTestId('league-selector-select');
    fireEvent.click(selectButton);

    const optionToSelect = await screen.findByText(mockLeagues[0].name);
    fireEvent.click(optionToSelect);

    await waitFor(() => {
      expect(handleSetLeague).toHaveBeenCalledWith(mockLeagues[0]);
    });
    expect(selectButton).toHaveTextContent(mockLeagues[0].name);
  });

  it('should reflect the currently selected leagueId', () => {
    mockGetFootballDataFn.mockResolvedValue(mockLeagues);
    mockUseQueryFn.mockReturnValue({
      data: mockLeagues,
      isLoading: false,
      isError: false,
    });
    render(
      <LeagueSelector
        country={mockCountry}
        leagueId={'L2'}
        setLeague={vi.fn()}
      />
    );
    const selectButton = screen.getByTestId('league-selector-select');
    expect(selectButton).toHaveTextContent(mockLeagues[1].name);
  });

  it('should be disabled and show "Select" if country is selected but has no leagues link', () => {
    const countryWithNoLeaguesLink = {
      ...mockCountry,
      _links: { ...mockCountry._links, leagues: { href: '' } },
    };
    mockUseQueryFn.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    render(
      <LeagueSelector
        country={countryWithNoLeaguesLink}
        leagueId={undefined}
        setLeague={vi.fn()}
      />
    );

    const selectButton = screen.getByTestId('league-selector-select');
    expect(selectButton).toHaveTextContent('Select');
  });
});
