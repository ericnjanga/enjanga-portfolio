// src/app/client-providers.tsx
'use client';

import { useEffect } from 'react';
import { Providers } from './providers';
import { AppUtilityProvider } from '@utils/UtilityContext';
import type { ContextType1 } from '@utils/dataProcessing/types';
import { DataDistributorProvider } from '@utils/context/DataDistributorContext';

/**
 * ClientProviders:
 * ---------------
 * Runs only on the client to set up polyfills and React contexts
 * without marking the root layout as dynamic.
 */

type ClientProvidersProps = {
  children: React.ReactNode;
  dataValue: {
    footer: ContextType1[];
    banners: {
      imgUrl: string | null;
    }
  },
};

export default function ClientProviders({
  children,
  dataValue,
}: ClientProvidersProps) {
  useEffect(() => {
    // Only load polyfill on the client, after mount
    // (Don’t bundle smoothscroll-polyfill into the initial chunk)
    import('smoothscroll-polyfill')
      .then((m) => m.polyfill())
      .catch(() => {});

    // Conditionally load the wicg-inert polyfill if the 'inert' property is not natively supported on HTMLElement.
    if (
      typeof HTMLElement !== 'undefined' &&
      !('inert' in HTMLElement.prototype)
    ) {
      import('wicg-inert').catch(() => {});
    }
  }, []);

  return (
    <AppUtilityProvider>
      <DataDistributorProvider value={dataValue}>
        <Providers>{children}</Providers>
      </DataDistributorProvider>
    </AppUtilityProvider>
  );
}
