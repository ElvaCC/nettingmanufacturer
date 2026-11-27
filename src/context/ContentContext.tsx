'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import fallbackData from '@/data/content.json';

const ContentContext = createContext<typeof fallbackData>(fallbackData);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<typeof fallbackData>(fallbackData);

  const refresh = useCallback(() => {
    // On localhost the checked-in content.json is the source of truth. The GitHub
    // override below is the deployed CMS; pulling it here would overwrite exactly
    // the content being previewed.
    if (typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) {
      return;
    }
    fetch('/api/admin/content?_t=' + Date.now(), { cache: 'no-store' })
      .then((res) => res.json())
      .then((json) => {
        if (json && typeof json === 'object' && !json.error) {
          setData(json);
        }
      })
      .catch((err) => console.warn('[ContentProvider] fetch failed:', err));
  }, []);

  // Initial fetch + listen for admin save events
  useEffect(() => {
    refresh();

    const handler = () => refresh();

    if (typeof window !== 'undefined') {
      window.addEventListener('content-updated', handler);
      return () => window.removeEventListener('content-updated', handler);
    }
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
