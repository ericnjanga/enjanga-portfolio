import Link from 'next/link';
import { getSiteSettings } from '@/lib/contentful/fetching/getSiteSettings';
import { Brand } from './Brand';
import MobileNavigation from './MobileNavigation';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

// Note: No need to provide default values here, as the data is already filtered and defaults are applied in getSiteSettings.ts
export default async function ServerNavbar() {
  const {
    siteName,
    navbar: { navigation },
  } = await getSiteSettings();

  return (
    <header className={styles.header}>
      <nav aria-label="Global" className={styles.nav}>
        <Brand siteName={siteName} />

        <MobileNavigation navigation={navigation} siteName={siteName} />

        <div className={styles.desktopNavigation}>
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              target={item.openInNewTab ? '_blank' : undefined}
              rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
              className={`${styles.navLink} ${item.href === '/' ? styles.active : ''}`}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
