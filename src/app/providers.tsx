'use client';

import { Content, Theme } from '@carbon/react';
import { ReactNode } from 'react';
import { AppHeader } from '@/src/components/AppHeader';
import { SkipNavigationLink } from '@/src/components/SkipNavigationLink';
import AppFooter from '../components/AppFooter/AppFooter';

interface RootLayoutProps {
  children: ReactNode;
}

export function Providers({ children }: RootLayoutProps) {
  return (
    <div>
      <SkipNavigationLink destinationId="main-content" />
      <Theme theme="g10">
        <AppHeader />
      </Theme>
      <Content>{children}</Content>
      <AppFooter />
    </div>
  );
}
