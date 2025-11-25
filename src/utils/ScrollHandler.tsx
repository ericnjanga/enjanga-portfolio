import { useEffect } from 'react';
import { useSearchParams, usePathname } from "enjanga-core-setup/next";

/**
 * ScrollHandler
 *
 * A client-only utility component responsible for:
 * 1. Listening to browser scroll events to enable future section tracking logic.
 * 2. Detecting the `?section=` query parameter in the URL and automatically scrolling
 *    to that section when the user is on the home page (`/`).
 *
 * This component uses Next.js router hooks (`useSearchPar***`, `usePathname`),
 * which must be wrapped in a <Suspense> boundary in the parent component.
 * It does not render any UI — it simply manages side effects related to scroll behavior.
 */
const ScrollHandler = () => {
  
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const targetSection = searchParams.get('section');

  const handleScroll = () => {
    // Logic to detect which section is in view
  };

  /**
   * Listen to when the page scrolls and do something
   */
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Only if we are on the home page, it will only scroll to the designated section
   */
  useEffect(() => {
    // Only scroll if we're on the home page already
    if (pathname === '/' && targetSection) {
      const element = document.getElementById(targetSection);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });

        // Set focus on keyboard/screen reader users
        element.setAttribute('tabindex', '-1'); // Make focusable
        element.focus({ preventScroll: true }); // Focus without re-scrolling

        // Update URL without page reload
        window.history.replaceState(null, '', `/?section=${targetSection}`);
      }
    }
  }, [targetSection, pathname]);

  return null;
};

export default ScrollHandler;