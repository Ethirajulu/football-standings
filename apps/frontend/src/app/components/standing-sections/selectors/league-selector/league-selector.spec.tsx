import { render } from '@testing-library/react';

import LeagueSelector from './league-selector';

describe('LeagueSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LeagueSelector />);
    expect(baseElement).toBeTruthy();
  });
});
