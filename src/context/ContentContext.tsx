'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import fallbackData from '@/data/content.json';

const ContentContext = createContext<typeof fallbackData>(fallbackData);

export function ContentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<typeof fallbackData>(fallbackData);

  useEffect(() => {
    fetch('/api/admin/content')
      .then((res) => res.json())
      .then((json) => {
        if (json && typeof json === 'object') {
          setData(json);
        }
      })
      .catch(() => {
        // fallback to static import on error
      });
  }, []);

  return (
    <ContentContext.Provider value={data}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent() {
  return useContext(ContentContext);
}
