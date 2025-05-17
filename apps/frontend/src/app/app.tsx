import {
  ReactQueryProvider,
  TranslationsProvider,
} from '@sapient-fc/react-providers';
import { StandingSections } from './components/standing-sections/standing-sections';

export const App = () => {
  return (
    <TranslationsProvider locale="en" namespaces={['common']}>
      <ReactQueryProvider>
        <StandingSections />
      </ReactQueryProvider>
    </TranslationsProvider>
  );
};
