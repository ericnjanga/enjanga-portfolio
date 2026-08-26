import { getSiteSettings } from '@/lib/contentful/fetching/getSiteSettings';
import { Brand } from './Brand';
import NavbarNavigation from './NavbarNavigation';
import styles from './Navbar.module.css';

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

        <NavbarNavigation navigation={navigation} siteName={siteName} />
      </nav>
    </header>
  );
}
