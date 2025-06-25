'use client';

import { useEffect } from 'react';
import { HeaderMenuItem } from '@carbon/react';
import Link from 'next/link';
import { useSectionNavigation } from '@/src/utils/navigation';
import { usePathname } from 'next/navigation';

export const GlobalNav = () => {
  const pathname = usePathname();
  const { navigateToSection } = useSectionNavigation();

  return (
    <>
      <HeaderMenuItem onClick={() => navigateToSection('scope-of-expertise')}>
        Scope of expertise
      </HeaderMenuItem>
      <HeaderMenuItem onClick={() => navigateToSection('about-me')}>
        About me
      </HeaderMenuItem>
      <HeaderMenuItem onClick={() => navigateToSection('best-work')}>
        Best Work
      </HeaderMenuItem>
      <Link href="/blog" passHref legacyBehavior>
        <HeaderMenuItem>Blog</HeaderMenuItem>
      </Link>
    </>
  );
};
