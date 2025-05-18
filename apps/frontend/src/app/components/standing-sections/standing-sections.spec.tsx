import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For .toBeInTheDocument()
import { StandingSections } from './standing-sections';
import { vi } from 'vitest';

// Mock child components
vi.mock('./selectors', () => ({
  CountrySelector: vi.fn(() => <div data-testid="country-selector">CountrySelector</div>),
}));
vi.mock('./selectors/league-selector/league-selector', () => ({
  LeagueSelector: vi.fn(() => <div data-testid="league-selector">LeagueSelector</div>),
}));
vi.mock('./selectors/team-selector/team-selector', () => ({
  __esModule: true, // For default exports
  default: vi.fn(() => <div data-testid="team-selector">TeamSelector</div>),
}));
vi.mock('./position-display', () => ({
  PositionDisplay: vi.fn(() => <div data-testid="position-display">PositionDisplay</div>),
}));

describe('StandingSections', () => {
  beforeEach(() => {
    // Reset mocks before each test if they are stateful or you need to check calls
    vi.clearAllMocks();
  });

  it('should render successfully and show only CountrySelector initially', () => {
    render(<StandingSections />);
    expect(screen.getByTestId('country-selector')).toBeInTheDocument();
    expect(screen.queryByTestId('league-selector')).not.toBeInTheDocument();
    expect(screen.queryByTestId('team-selector')).not.toBeInTheDocument();
    expect(screen.queryByTestId('position-display')).not.toBeInTheDocument();
  });

  // Note: To test the conditional rendering of LeagueSelector, TeamSelector, and PositionDisplay,
  // you would need to simulate the setCountry, setLeague, and setTeam state changes.
  // This typically involves interacting with the mocked selectors if they were to call these setters,
  // or directly manipulating state if using a more advanced setup (e.g., exposing setters for testing, though not ideal).

  // Add more tests here for different states and interactions
});

// Helper to ensure mocks are typed correctly if needed, e.g.
// const MockedCountrySelector = CountrySelector as vi.MockedFunction<typeof CountrySelector>;
