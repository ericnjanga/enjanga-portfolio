'use client';

import { useEffect } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import { Providers } from './providers';

/**
 * Client component wrapper that handles client-side logic globally (polyfill, context providers). This way, we'll keep layout.tsx fully server-oriented.
 * @param param0
 * @returns
 */

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  /**
   * Enabling scroll polyfill to support Safari and old browsers
   * WHY? Because "scrollIntoView({ ... })" doesn't work in Safari
   * Initializing it once when the app loads
   */
  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  return <Providers>{children}</Providers>;
}
