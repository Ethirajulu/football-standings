import { render } from '@testing-library/react';

import { Select } from './Select';

describe('Select', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Select
        options={[{ name: 'Option 1', id: '1' }]}
        value="1"
        onChange={() => {
          // do nothing
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
