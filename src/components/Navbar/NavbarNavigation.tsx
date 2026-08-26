'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { NavigationItemData } from '@/lib/contentful/models';
import MobileNavigation from './MobileNavigation';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

type NavbarNavigationProps = {
  navigation: NavigationItemData[];
  siteName?: string;
};

function getSectionId(href: string) {
  if (href === '/') return 'home';

  try {
    const url = new URL(href, window.location.origin);
    return url.pathname === '/' && url.hash ? url.hash.slice(1) : null;
  } catch {
    return null;
  }
}

export default function NavbarNavigation({
  navigation,
  siteName,
}: NavbarNavigationProps) {
  const pathname = usePathname();
  const pathnameLink = navigation.find(
    ({ href }) => !href.includes('#') && href.split('?')[0] === pathname
  );
  const [activeHref, setActiveHref] = useState(pathnameLink?.href ?? '/');

  useEffect(() => {
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

  return (
    <>
      <MobileNavigation
        navigation={navigation}
        siteName={siteName}
        activeHref={activeHref}
        onNavigate={setActiveHref}
      />

      <div className={styles.desktopNavigation}>
        {navigation.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            target={item.openInNewTab ? '_blank' : undefined}
            rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
            aria-current={activeHref === item.href ? 'page' : undefined}
            onClick={() => setActiveHref(item.href)}
            className={`${styles.navLink} ${
              activeHref === item.href ? styles.active : ''
            }`}
          >
            {item.name}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </>
  );
}
