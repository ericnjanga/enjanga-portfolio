import type { NavigationItem } from '@/lib/contentful/types'; 

export const navFallback: NavigationItem[] = [
  { id: '1', name: '* Home', href: '/', openInNewTab: false },
  { id: '2', name: '* Expertise', href: '/expertise', openInNewTab: false },
  { id: '3', name: '* About', href: '/about', openInNewTab: false },
  { id: '4', name: '* Case Studies', href: '/case-studies', openInNewTab: false },
];