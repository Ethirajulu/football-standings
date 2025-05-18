/// <reference types="vitest/globals" />
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TeamSelector } from './team-selector';
import { League, Team } from '@sapient-fc/shared';
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

const mockLeague: League = {
  id: '1',
  name: 'Premier League',
  logo: 'league-logo.png',
  _links: {
    self: { href: '/leagues/1' },
    teams: { href: '/leagues/1/teams' },
  },
};

const mockTeams: Team[] = [
  {
    id: 'T1',
    name: 'Cheshire Cats FC',
    logo: 'team1.png',
    _links: {
      self: { href: '/teams/T1' },
      standing: { href: '/standings/T1' },
    },
  },
  {
    id: 'T2',
    name: 'March Hares United',
    logo: 'team2.png',
    _links: {
      self: { href: '/teams/T2' },
      standing: { href: '/standings/T2' },
    },
  },
];

describe('TeamSelector', () => {
  beforeEach(() => {
    mockUseQueryFn.mockReset();
    mockGetFootballDataFn.mockReset();
  });

  it('should render a select with teams when a league is selected', async () => {
    mockGetFootballDataFn.mockResolvedValue(mockTeams);
    mockUseQueryFn.mockReturnValue({
      data: mockTeams,
      isLoading: false,
      isError: false,
    });

    render(
      <TeamSelector league={mockLeague} teamId={undefined} setTeam={vi.fn()} />
    );

    const selectButton = screen.getByTestId('team-selector-select');
    expect(selectButton).toBeInTheDocument();
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('should call setTeam when a team is selected', async () => {
    mockGetFootballDataFn.mockResolvedValue(mockTeams);
    mockUseQueryFn.mockReturnValue({
      data: mockTeams,
      isLoading: false,
      isError: false,
    });
    const handleSetTeam = vi.fn();
    render(
      <TeamSelector
        league={mockLeague}
        teamId={undefined}
        setTeam={handleSetTeam}
      />
    );

    const selectButton = screen.getByTestId('team-selector-select');
    fireEvent.click(selectButton);

    const optionToSelect = await screen.findByText(mockTeams[0].name);
    fireEvent.click(optionToSelect);

    await waitFor(() => {
      expect(handleSetTeam).toHaveBeenCalledWith(mockTeams[0]);
    });
    expect(selectButton).toHaveTextContent(mockTeams[0].name);
  });

  it('should reflect the currently selected teamId', () => {
    mockGetFootballDataFn.mockResolvedValue(mockTeams);
    mockUseQueryFn.mockReturnValue({
      data: mockTeams,
      isLoading: false,
      isError: false,
    });
    render(
      <TeamSelector league={mockLeague} teamId={'T2'} setTeam={vi.fn()} />
    );
    const selectButton = screen.getByTestId('team-selector-select');
    expect(selectButton).toHaveTextContent(mockTeams[1].name);
  });

  it('should be disabled and show "Select" if league is selected but has no teams link', () => {
    const leagueWithNoTeamsLink = {
      ...mockLeague,
      _links: { ...mockLeague._links, teams: { href: '' } },
    };
    mockUseQueryFn.mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      isSuccess: true,
    });

    render(
      <TeamSelector
        league={leagueWithNoTeamsLink}
        teamId={undefined}
        setTeam={vi.fn()}
      />
    );

    const selectButton = screen.getByTestId('team-selector-select');
    expect(selectButton).toHaveTextContent('Select');
  });
});
