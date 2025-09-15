'use client';

import { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { Providers } from './providers';
import { AppUtilityProvider } from '../utils/UtilityContext';

/**
 * Client component wrapper that handles client-side logic globally (polyfill, context providers).
 * This keeps layout.tsx server-only, while polyfills and contexts load on the client.
 */
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Smooth scroll polyfill (needed for Safari / old browsers)
    smoothscroll.polyfill();

    // Only load inert polyfill if not supported natively
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
