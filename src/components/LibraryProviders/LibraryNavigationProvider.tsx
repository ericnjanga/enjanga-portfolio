'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { PortfolioLink } from '../Adapters/PortfolioLink';
import { LinkProvider, ScrollRevealProvider } from 'enjanga-components-library';

export default function LibraryNavigationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <LinkProvider component={PortfolioLink}>
      <ScrollRevealProvider routeKey={pathname ?? '/'}>
        {children}
      </ScrollRevealProvider>
    </LinkProvider>
  );
}
