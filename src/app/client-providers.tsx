// src/app/client-providers.tsx
'use client';

import { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { Providers } from './providers';
import { AppUtilityProvider } from '@utils/UtilityContext';
import type { ContextType1 } from '@utils/dataProcessing/types';
import { FooterProvider } from '@utils/context/FooterContext';

/**
 * ClientProviders:
 * Runs only on the client to set up polyfills and React contexts
 * without marking the root layout as dynamic.
 */


type ClientProvidersProps = {
  children: React.ReactNode;
  footer: ContextType1[]
}


export default function ClientProviders({
  children,
  footer
}: ClientProvidersProps) {
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
      <FooterProvider value={footer}>
        <Providers>{children}</Providers>
      </FooterProvider>
    </AppUtilityProvider>
  );
}
