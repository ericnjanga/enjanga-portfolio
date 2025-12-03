'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Content, Theme } from '@carbon/react';
import { ReactNode } from 'react';
import { SkipNavigationLink } from '@/components/SkipNavigationLink';
import { AppHeaderWrapper } from '@/components/AppHeader/AppHeader';
import dynamic from 'next/dynamic';
import { SkeletonComponent } from '@/app/ui/Skeleton';

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * Deferring (Dynamic imports) the following component (and their CSS):
 * - AppFooter
 */
const AppFooter = dynamic(() => import('@/components/AppFooter/AppFooter'), {
  ssr: false, // Ony render on the client
  loading: () => <SkeletonComponent name="Footer" minHeight={300} />,
});

export function Providers({ children }: RootLayoutProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <SkipNavigationLink destinationId="main-content" />
        <Theme theme="g10">
          <AppHeaderWrapper />
        </Theme>
        <main id="main-content">
          <Content>{children}</Content>
        </main>
        <AppFooter />
      </div>
    </QueryClientProvider>
  );
}
