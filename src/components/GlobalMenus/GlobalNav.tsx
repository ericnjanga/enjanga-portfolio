'use client';

import { HeaderMenuItem } from '@carbon/react';
import { useSectionNavigation } from '@utils/navigation';
import { useRouter } from 'next/navigation';

type GlobalNavType = {
  parent?: 'top nav' | 'footer'
};

export const GlobalNav = ({ parent = 'top nav' }: GlobalNavType) => {
  const router = useRouter();
  const { navigateToSection } = useSectionNavigation();

  return (
    <>
      {parent === 'footer' && (
        <HeaderMenuItem onClick={() => navigateToSection('introduction')}>
          Introduction
        </HeaderMenuItem>
      )}
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
