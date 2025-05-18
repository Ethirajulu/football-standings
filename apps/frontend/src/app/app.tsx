import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StandingSections } from './components/standing-sections/standing-sections';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StandingSections />
    </QueryClientProvider>
  );
};
