import { render } from '@testing-library/react';
import { OfflineQueryProvider } from './offline-query-provider';

describe('OfflineQueryProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <OfflineQueryProvider>hi</OfflineQueryProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
