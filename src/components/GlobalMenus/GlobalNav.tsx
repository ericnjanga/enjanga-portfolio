// GlobalNav.tsx
'use client';

import { HeaderMenuItem } from '@carbon/react';
import { useSectionNavigation } from '@utils/navigation';
import { usePathname } from 'next/navigation';
import {
  useSearchParamData,
  useIsHomeActiveFlag,
} from '@utils/context/SearchParamProvider';
import { Link } from 'enjanga-core-setup';
import type { MouseEvent } from 'react';

type GlobalNavType = { parent?: 'top nav' | 'footer' };

export const GlobalNav = ({ parent = 'top nav' }: GlobalNavType) => {
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
          as={Link}
          href="/?section=introduction"
          onClick={(event: MouseEvent<HTMLElement>) => {
            event.preventDefault();
            navigateToSection('introduction');
          }}
          aria-current={isHomeRoute ? 'page' : undefined}
        >
          Introduction
        </HeaderMenuItem>
      )}

      <HeaderMenuItem
        as={Link}
        href="/?section=service"
        onClick={(event: MouseEvent<HTMLElement>) => {
          event.preventDefault();
          navigateToSection('service');
        }}
        aria-current={isActive('service') ? 'location' : undefined}
      >
        Service
      </HeaderMenuItem>

      <HeaderMenuItem
        as={Link}
        href="/?section=about"
        onClick={(event: MouseEvent<HTMLElement>) => {
          event.preventDefault();
          navigateToSection('about');
        }}
        aria-current={isActive('about') ? 'location' : undefined}
      >
        About
      </HeaderMenuItem>

      <HeaderMenuItem
        as={Link}
        href="/?section=experience"
        onClick={(event: MouseEvent<HTMLElement>) => {
          event.preventDefault();
          navigateToSection('experience');
        }}
        aria-current={isExperienceActive ? 'location' : undefined}
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
