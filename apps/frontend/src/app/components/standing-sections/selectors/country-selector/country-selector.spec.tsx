import { render } from '@testing-library/react';

import { CountrySelector } from './country-selector';

describe('CountrySelector', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CountrySelector countries={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
