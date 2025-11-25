'use client';

import { HeaderMenuItem } from '@carbon/react';
import { useSectionNavigation } from '@utils/navigation';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

type GlobalNavType = {
  parent?: 'top nav' | 'footer'
};

export const GlobalNav = ({ parent = 'top nav' }: GlobalNavType) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { navigateToSection } = useSectionNavigation();

  // Get current active section from URL search params
  const currentSection = searchParams.get('section');

  // Determine if a menu item is active based on the current section
  const isActive = (target: string) => {
    // For introduction (homepage with no section param)
    if (target === 'introduction') {
      return !currentSection || currentSection === 'introduction';
    }
    
    // For other sections
    return currentSection === target;
  };

  // For blog route (separate page)
  const isBlogActive = pathname === '/blog' || pathname.startsWith('/blog/');

  return (
    <>
      {parent === 'footer' && (
        <HeaderMenuItem 
          onClick={() => navigateToSection('introduction')}
          isCurrentPage={isActive('introduction')}
        >
          Introduction
        </HeaderMenuItem>
      )}
      <HeaderMenuItem 
        onClick={() => navigateToSection('scope-of-expertise')}
        isCurrentPage={isActive('scope-of-expertise')}
      >
        Scope of expertise
      </HeaderMenuItem>
      <HeaderMenuItem 
        onClick={() => navigateToSection('about-me')}
        isCurrentPage={isActive('about-me')}
      >
        About me
      </HeaderMenuItem>
      <HeaderMenuItem 
        onClick={() => navigateToSection('best-work')}
        isCurrentPage={isActive('best-work')}
      >
        Best Work
      </HeaderMenuItem>
      <HeaderMenuItem 
        onClick={() => router.push('/blog')}
        isCurrentPage={isBlogActive}
      >
        Blog
      </HeaderMenuItem>
    </>
  );
};