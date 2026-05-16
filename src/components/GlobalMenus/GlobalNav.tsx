// GlobalNav.tsx
'use client';

import { HeaderMenuItem } from '@carbon/react';
import { useSectionNavigation } from '@utils/navigation';
import { useRouter, usePathname } from 'next/navigation';
import { useSearchParamData, useIsHomeActiveFlag } from '@utils/context/SearchParamProvider';
import { Link } from 'enjanga-core-setup';

type GlobalNavType = { parent?: 'top nav' | 'footer' };

export const GlobalNav = ({ parent = 'top nav' }: GlobalNavType) => {
  const router = useRouter();
  const pathname = usePathname();
  const { navigateToSection } = useSectionNavigation();
  const { section: currentSection } = useSearchParamData();
  const isHomeRoute = useIsHomeActiveFlag();

  const isCaseStudiesActive =
    pathname === '/case-studies' || pathname.startsWith('/case-studies/');
  const isExperienceActive =
    pathname === '/experience' ||
    pathname.startsWith('/experience/') ||
    currentSection === 'experience';

  const isActive = (target: string) => currentSection === target;

  return (
    <>
      {parent === 'footer' && (
        <HeaderMenuItem
          onClick={() => navigateToSection('introduction')}
          aria-current={isHomeRoute ? 'page' : undefined}
        >
          Introduction
        </HeaderMenuItem>
      )}

      <HeaderMenuItem
        onClick={() => navigateToSection('service')}
        aria-current={isActive('service') ? 'page' : undefined}
      >
        Service
      </HeaderMenuItem>

      <HeaderMenuItem
        onClick={() => navigateToSection('about')}
        aria-current={isActive('about') ? 'page' : undefined}
      >
        About
      </HeaderMenuItem>

      <HeaderMenuItem
        onClick={() => navigateToSection('experience')}
        aria-current={isExperienceActive ? 'page' : undefined}
      >
        Experience
      </HeaderMenuItem>

      <HeaderMenuItem
        as={Link}
        href="/case-studies"
        aria-current={isCaseStudiesActive ? 'page' : undefined}
      >
        Case Studies
      </HeaderMenuItem>
    </>
  );
};
