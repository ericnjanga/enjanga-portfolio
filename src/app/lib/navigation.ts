'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';

/**
 * 
 * Smart Navigation: 
    - If already on home page: smooth scroll + URL update 
    - If coming from another route: full navigation 

  URL Management: 
    - Uses history.replaceState to update URL without reload 
    - Maintains the section in the URL for sharing/bookmarking

  Performance: 
    - No unnecessary page reloads when already on home 
    - Smooth scrolling for better UX
 */

export function useSectionNavigation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const navigateToSection = (sectionId: string) => {
    if (pathname === '/') {
      // Already on home - smooth scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', `/?section=${sectionId}`);
      }
    } else {
      // Coming from another route - redirect with hash
      router.push(`/?section=${sectionId}`);
    }
  };

  return { navigateToSection };
}
