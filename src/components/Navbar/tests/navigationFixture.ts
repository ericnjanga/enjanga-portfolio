import type { NavigationItem } from '@/lib/contentful/types';

export const navigationFixture: NavigationItem[] = [
  {
    id: 'work',
    name: 'Work',
    href: '/work',
    openInNewTab: false,
  },
  {
    id: 'about',
    name: 'About',
    href: '/#about',
    openInNewTab: false,
  },
  {
    id: 'expertise',
    name: 'Expertise',
    href: '/#expertise',
    openInNewTab: false,
  },
  {
    id: 'home',
    name: 'Home',
    href: '/',
    openInNewTab: false,
  },
];
