// src/app/client-providers.tsx
'use client';

import { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { Providers } from './providers';
import { AppUtilityProvider } from '../utils/UtilityContext';

/**
 * ClientProviders:
 * Runs only on the client to set up polyfills and React contexts
 * without marking the root layout as dynamic.
 */
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    smoothscroll.polyfill();

    if (
      typeof HTMLElement !== 'undefined' &&
      !('inert' in HTMLElement.prototype)
    ) {
      import('wicg-inert').catch(() => {});
    }
  }, []);

  return (
    <AppUtilityProvider>
      <Providers>{children}</Providers>
    </AppUtilityProvider>
  );
}
