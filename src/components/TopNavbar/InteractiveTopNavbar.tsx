'use client';

import { PageNavbar, NavbarThemeToggle } from 'enjanga-components-library';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import type { NavigationItemData } from '@/lib/contentful/models';
import useTheme from './useTheme';

type InteractiveTopNavbarProps = {
  navigation: NavigationItemData[];
  siteName?: string;
};

export default function InteractiveTopNavbar({
  navigation,
  siteName,
}: InteractiveTopNavbarProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const items = useMemo(() => navigation.map(item => ({
    id: item.id,
    label: item.name,
    href: item.href,
    openInNewTab: item.openInNewTab,
  })), [navigation]);

  return (
    <PageNavbar
      brand={siteName ?? 'Eric Njanga'}
      brandLabel={`${siteName ?? 'Eric Njanga'} home`}
      pathname={pathname ?? '/'}
      ariaLabel="Global"
      items={items}
      actions={<NavbarThemeToggle theme={theme} onThemeChange={toggleTheme} />}
    />
  );
}
