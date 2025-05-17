import {
  ReactQueryProvider,
  TranslationsProvider,
} from '@sapient-fc/react-providers';

export const App = () => {
  return (
    <TranslationsProvider locale="en" namespaces={['common']}>
      <ReactQueryProvider>
        <h1>
          <span> Hello there, </span>
          Welcome frontend 👋
        </h1>
      </ReactQueryProvider>
    </TranslationsProvider>
  );
};
