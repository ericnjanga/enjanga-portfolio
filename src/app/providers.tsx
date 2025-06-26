'use client';

import { Content, Theme } from '@carbon/react';
import { ReactNode } from 'react';
import { AppHeader, BrandLogo } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { GlobalActions, GlobalNav } from '../components/GlobalMenus';
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
        <AppHeader
          brandLabel="Eric Njanga"
          brandRoute="/"
          brand={<BrandLogo value="Brand Logo Here ..." />}
          navigation={<GlobalNav />}
          globalBarItems={<GlobalActions />}
        />
      </Theme>
      <Content>{children}</Content>
      <AppFooter />
    </div>
  );
}
