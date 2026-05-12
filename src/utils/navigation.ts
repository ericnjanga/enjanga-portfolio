'use client';

import { useRouter, usePathname } from "enjanga-core-setup/next";

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

/**
 * Logo click behavior:
 * - On home route: scroll to top smoothly
 * - On other routes: navigate to home
 */
export function useLogoClick() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent) => {
    // If on home route, scroll to top instead of reloading
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Clear any section query parameter
      window.history.replaceState(null, '', '/');
    }
    // Otherwise, allow default navigation behavior
  };

  return { handleLogoClick };
}
