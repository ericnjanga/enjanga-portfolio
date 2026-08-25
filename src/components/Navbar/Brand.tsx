'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { MouseEvent } from 'react';
import styles from './Navbar.module.css';

type BrandProps = {
  siteName?: string;
  onNavigate?: () => void;
};

export function Brand({
  siteName = 'Eric Njanga',
  onNavigate,
}: BrandProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    if (pathname !== '/') return;

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Link
      href="/"
      aria-label={`${siteName} home`}
      className={styles.brand}
      onClick={handleClick}
    >
      <span>{siteName}</span>
    </Link>
  );
}
