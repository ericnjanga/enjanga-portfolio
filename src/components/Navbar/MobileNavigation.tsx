'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { NavigationItemData } from '@/lib/contentful/models';
import { Brand } from './Brand';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

type MobileNavigationProps = {
  navigation: NavigationItemData[];
  siteName?: string;
  activeHref?: string;
  onNavigate?: (href: string) => void;
};

export default function MobileNavigation({
  navigation,
  siteName,
  activeHref,
  onNavigate,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.mobileNavigation}>
      <ThemeToggle />
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={styles.menuButton}
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div id="mobile-menu">
          <button
            type="button"
            aria-label="Close menu"
            className={styles.overlay}
            onClick={() => setIsOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className={styles.drawer}
          >
            <div className={styles.drawerHeader}>
              <Brand siteName={siteName} onNavigate={() => setIsOpen(false)} />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className={styles.closeButton}
              >
                <span className="sr-only">Close menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div>
              <div>
                <div className={styles.mobileLinks}>
                  {navigation.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      target={item.openInNewTab ? '_blank' : undefined}
                      rel={
                        item.openInNewTab ? 'noopener noreferrer' : undefined
                      }
                      aria-current={
                        activeHref === item.href ? 'page' : undefined
                      }
                      onClick={() => {
                        onNavigate?.(item.href);
                        setIsOpen(false);
                      }}
                      className={`${styles.navLink} ${
                        activeHref === item.href ? styles.active : ''
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
