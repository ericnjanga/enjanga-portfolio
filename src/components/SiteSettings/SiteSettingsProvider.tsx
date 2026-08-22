'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { SiteSettingsData } from '@/lib/contentful/models';

const SiteSettingsContext = createContext<SiteSettingsData | null>(null);

type SiteSettingsProviderProps = {
  children: ReactNode;
  value: SiteSettingsData;
};

export function SiteSettingsProvider({
  children,
  value,
}: SiteSettingsProviderProps) {
  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettingsData {
  const siteSettings = useContext(SiteSettingsContext);

  if (!siteSettings) {
    throw new Error(
      'useSiteSettings must be used within a SiteSettingsProvider.'
    );
  }

  return siteSettings;
}
