import {
  dehydrate,
  DehydratedState,
  hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
  ReactNode,
} from 'react';

const STORAGE_KEY = 'reactQueryCache';

export interface OfflineContextValue {
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
}
export const OfflineContext = createContext<OfflineContextValue>({
  isOnline: navigator.onLine,
  setIsOnline: () => {
    /* noop */
  },
});
export const useOffline = () => useContext(OfflineContext);

export const createOfflineQueryClient = (): QueryClient => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        enabled: navigator.onLine,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  // Restore cache from storage
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      hydrate(client, JSON.parse(stored) as DehydratedState);
    }
  } catch (error) {
    console.warn('Offline: failed to hydrate cache', error);
  }

  // Persist cache on changes
  client.getQueryCache().subscribe(() => {
    try {
      const state = dehydrate(client);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn('Offline: failed to persist cache', error);
    }
  });

  return client;
};

export const OfflineQueryProvider = ({ children }: { children: ReactNode }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const client = useMemo(() => createOfflineQueryClient(), []);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  // toggle query fetching based on connectivity
  useEffect(() => {
    client.setDefaultOptions({
      queries: {
        enabled: isOnline,
      },
    });
  }, [isOnline, client]);

  return (
    <OfflineContext.Provider value={{ isOnline, setIsOnline }}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </OfflineContext.Provider>
  );
};

// A simple UI toggle to manually switch online/offline state
export const OfflineToggle = () => {
  const { isOnline, setIsOnline } = useOffline();
  return (
    <button
      onClick={() => setIsOnline(!isOnline)}
      style={{ position: 'fixed', top: 10, right: 10, padding: '0.5rem 1rem' }}
    >
      {isOnline ? 'Go Offline' : 'Go Online'}
    </button>
  );
};
