'use client';

import { Navbar } from 'enjanga-components-library';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { NavigationItemData } from '@/lib/contentful/models';
import styles from './TopNavbar.module.css';
import ThemeToggle from './ThemeToggle';
import { getSectionId } from './utils';

type NavbarNavigationProps = {
  navigation: NavigationItemData[];
  siteName?: string;
};

/**
 * 
 * @param param0 
 * @returns 
 */

export default function NavbarNavigation({
  navigation,
  siteName,
}: NavbarNavigationProps) {
  const pathname = usePathname();
  const pathnameLink = navigation.find(
    ({ href }) => !href.includes('#') && (href.split('?')[0] === pathname || (href !== '/' && pathname?.startsWith(`${href}/`)))
  );
  const [activeHref, setActiveHref] = useState(pathnameLink?.href ?? '/');

  useEffect(() => { console.log('----pathname=', pathname, 'pathnameLink=',  'activeHref=', activeHref);
    if (pathname !== '/') {
      setActiveHref(pathnameLink?.href ?? '');
      return;
    }

    const sectionLinks = navigation.flatMap((item) => {
      const sectionId = getSectionId(item.href);
      const section = sectionId ? document.getElementById(sectionId) : null;
      return section ? [{ href: item.href, sectionId, section }] : [];
    });

    if (sectionLinks.length === 0) return;

    const hashLink = sectionLinks.find(
      ({ sectionId }) => `#${sectionId}` === window.location.hash
    );
    if (hashLink) setActiveHref(hashLink.href);

    let animationFrame = 0;

    const updateActiveSection = () => {
      const headerHeight =
        document.querySelector('header')?.getBoundingClientRect().height ?? 0;
      const activationLine = headerHeight + 1;
      const orderedSections = [...sectionLinks].sort(
        (first, second) =>
          first.section.getBoundingClientRect().top -
          second.section.getBoundingClientRect().top
      );
      const isAtPageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      const activeSection = isAtPageBottom
        ? orderedSections[orderedSections.length - 1]
        : [...orderedSections]
            .reverse()
            .find(
              ({ section }) =>
                section.getBoundingClientRect().top <= activationLine
            ) ?? orderedSections[0];

      setActiveHref(activeSection.href);

      const nextHash =
        activeSection.sectionId === 'home' ? '' : `#${activeSection.sectionId}`;
      if (window.location.hash !== nextHash) {
        window.history.replaceState(
          window.history.state,
          '',
          `${window.location.pathname}${window.location.search}${nextHash}`
        );
      }
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('hashchange', scheduleUpdate);
    window.addEventListener('popstate', scheduleUpdate);
    animationFrame = requestAnimationFrame(() => {
      animationFrame = requestAnimationFrame(updateActiveSection);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('hashchange', scheduleUpdate);
      window.removeEventListener('popstate', scheduleUpdate);
    };
  }, [navigation, pathname, pathnameLink?.href]);

  return <Navbar brand={siteName ?? 'Eric Njanga'} brandLabel={`${siteName ?? 'Eric Njanga'} home`}
    className={styles.libraryNavbar} ariaLabel="Global" activeHref={activeHref}
    items={navigation.map(item => ({ id: item.id, label: item.name, href: item.href, openInNewTab: item.openInNewTab }))}
    actions={<ThemeToggle />} onNavigate={({ item }) => setActiveHref(item.href)} />;
}
