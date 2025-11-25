'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Content, Theme } from '@carbon/react';
import { ReactNode } from 'react';
import { SkipNavigationLink } from '@/components/SkipNavigationLink';
import AppFooter from '../components/AppFooter/AppFooter';
import { AppHeaderWrapper } from '@/components/AppHeader/AppHeader';

interface RootLayoutProps {
  children: ReactNode;
}

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

