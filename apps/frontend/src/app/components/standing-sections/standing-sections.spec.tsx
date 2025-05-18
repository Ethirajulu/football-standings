/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StandingSections } from './standing-sections';
import { vi } from 'vitest';

vi.mock('./selectors', () => ({
  CountrySelector: vi.fn(() => (
    <div data-testid="country-selector">CountrySelector</div>
  )),
}));
vi.mock('./selectors/league-selector/league-selector', () => ({
  LeagueSelector: vi.fn(() => (
    <div data-testid="league-selector">LeagueSelector</div>
  )),
}));
vi.mock('./selectors/team-selector/team-selector', () => ({
  __esModule: true,
  default: vi.fn(() => <div data-testid="team-selector">TeamSelector</div>),
}));
vi.mock('./position-display', () => ({
  PositionDisplay: vi.fn(() => (
    <div data-testid="position-display">PositionDisplay</div>
  )),
}));

describe('StandingSections', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render successfully and show only CountrySelector initially', () => {
    render(<StandingSections />);
    expect(screen.getByTestId('country-selector')).toBeInTheDocument();
    expect(screen.queryByTestId('league-selector')).not.toBeInTheDocument();
    expect(screen.queryByTestId('team-selector')).not.toBeInTheDocument();
    expect(screen.queryByTestId('position-display')).not.toBeInTheDocument();
  });
});
