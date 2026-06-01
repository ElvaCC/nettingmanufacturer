'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import fallbackData from '@/data/content.json';

const ContentContext = createContext<typeof fallbackData>(fallbackData);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<typeof fallbackData>(fallbackData);

  const refresh = useCallback(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((json) => {
        if (json && typeof json === 'object' && !json.error) {
          setData(json);
        }
      })
      .catch(() => {});
  }, []);

  // Initial fetch
  useEffect(() => {
    refresh();

    // Listen for admin save events
    const handler = () => refresh();
    window.addEventListener('content-updated', handler);
    return () => window.removeEventListener('content-updated', handler);
  }, [refresh]);

  return (
    <ContentContext.Provider value={data}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
