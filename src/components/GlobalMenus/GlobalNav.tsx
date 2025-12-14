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

  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/');
  const isBestWorkActive =
    pathname === '/best-work' ||
    pathname.startsWith('/best-work/') ||
    currentSection === 'best-work';

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
        onClick={() => navigateToSection('scope-of-expertise')}
        aria-current={isActive('scope-of-expertise') ? 'page' : undefined}
      >
        Scope of expertise
      </HeaderMenuItem>

      <HeaderMenuItem
        onClick={() => navigateToSection('about-me')}
        aria-current={isActive('about-me') ? 'page' : undefined}
      >
        About me
      </HeaderMenuItem>

      <HeaderMenuItem
        onClick={() => navigateToSection('best-work')}
        aria-current={isBestWorkActive ? 'page' : undefined}
      >
        Best Work
      </HeaderMenuItem>

      <HeaderMenuItem as={Link} href="/blog" aria-current={isBlogActive ? 'page' : undefined}>
        Blog
      </HeaderMenuItem>
    </>
  );
};
