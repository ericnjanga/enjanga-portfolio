import Link from 'next/link';
import type { NavbarData } from '@/lib/contentful/models'; 
import { Brand } from './Brand';
import MobileNavigation from './MobileNavigation'; 

// Note: No need to provide default values here, as the data is already filtered and defaults are applied in getSiteSettings.ts
export default function ServerNavbar({
  siteName,
  navigation,
}: NavbarData) { 
  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <Brand siteName={siteName} />

        <MobileNavigation navigation={navigation} siteName={siteName} />

        <div className="hidden items-center gap-x-12 lg:flex">
          {navigation.map((item) => (
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
