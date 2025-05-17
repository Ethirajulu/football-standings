import { render } from '@testing-library/react';

import TeamSelector from './team-selector';

describe('TeamSelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TeamSelector />);
    expect(baseElement).toBeTruthy();
  });
});
