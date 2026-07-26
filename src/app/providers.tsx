'use client';

import { ReactNode } from 'react';
import { SkipNavigationLink } from '@/components/SkipNavigationLink';
import dynamic from 'next/dynamic';
import { SkeletonComponent } from '@/app/ui/Skeleton';

/**
 * Deferring (Dynamic imports) the following component (and their CSS):
 * - AppHeaderWrapper
 * - CarbonShell (Dynamically importing the Carbon wrapper so it loads after initial render.)
 * - AppFooter
 */
// Dynamically importing the AppHeaderWrapper so it loads after initial render.
const AppHeaderWrapper = dynamic(
  () =>
    import('@/components/AppHeader/AppHeader').then(
      (mod) => mod.AppHeaderWrapper
    ),
  {
    ssr: true, // Startial render on the server
    loading: () => (
      <SkeletonComponent name="main navigation links." minHeight={70} />
    ),
  }
);

const CarbonShell = dynamic(() => import('@/app/carbon-shell'), {
  ssr: true, // Startial render on the server
  loading: () => <SkeletonComponent name="major components" minHeight={500} />,
});

// Dynamically importing the AppFooter so it loads after initial render.
const AppFooter = dynamic(() => import('@/components/AppFooter/AppFooter'), {
  ssr: false, // Ony render on the client
  loading: () => (
    <SkeletonComponent
      name="contact information, navigation links, and published work."
      minHeight={200}
      theme="dark"
    />
  ),
});

interface RootLayoutProps {
  children: ReactNode;
}

export function Providers({ children }: RootLayoutProps) {
  return (
    <div>
      <SkipNavigationLink destinationId="main-content" />
      <AppHeaderWrapper />
      <CarbonShell>{children}</CarbonShell>
      <AppFooter />
    </div>
  );
}
