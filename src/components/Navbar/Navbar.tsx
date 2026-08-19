import Link from 'next/link'; 
import type { NavigationItem } from '@/lib/contentful/types';
import { navFallback } from './utils';
import { Brand } from './Brand';
import MobileNavigation from './MobileNavigation';

type ServerNavbarProps = {
  navigation: NavigationItem[];
};

export default function ServerNavbar({ 
  navigation
}: ServerNavbarProps) { 
  const items = navigation?.length > 0 ? navigation : navFallback; 

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <Brand />

        <MobileNavigation navigation={items} />

        <div className="hidden items-center gap-x-12 lg:flex">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target={item.openInNewTab ? '_blank' : undefined}
              rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
