'use client';

import { HeaderMenuItem } from '@carbon/react';
import { Link } from "enjanga-core-setup/next";
import { useSectionNavigation } from '@utils/navigation';
import { useRouter } from 'next/navigation';

export const GlobalNav = () => {
  const router = useRouter();
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
      <HeaderMenuItem onClick={() => router.push('/blog')}>
        Blog
      </HeaderMenuItem>
    </>
  );
};
