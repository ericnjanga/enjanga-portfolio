'use client';

import { HeaderMenuItem } from '@carbon/react';
import { Link, usePathname } from "enjanga-core-setup/next";
import { useSectionNavigation } from '@utils/navigation';

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
