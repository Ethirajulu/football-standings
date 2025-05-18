import { OfflineQueryProvider, OfflineToggle } from '@sapient-fc/offline';
import { StandingSections } from './components/standing-sections/standing-sections';

export const App = () => {
  return (
    <OfflineQueryProvider>
      <OfflineToggle />
      <StandingSections />
    </OfflineQueryProvider>
  );
};
