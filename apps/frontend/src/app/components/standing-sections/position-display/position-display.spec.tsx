import { render } from '@testing-library/react';

import PositionDisplay from './position-display';

describe('PositionDisplay', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PositionDisplay />);
    expect(baseElement).toBeTruthy();
  });
});
