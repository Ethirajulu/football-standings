import { StandingSections } from './components/standing-sections/standing-sections';
import {
  OfflineQueryProvider,
  OfflineToggle,
} from '@sapient-fc/offline-query-provider';

export const App = () => {
  return (
    <OfflineQueryProvider>
      <OfflineToggle />
      <StandingSections />
    </OfflineQueryProvider>
  );
};
