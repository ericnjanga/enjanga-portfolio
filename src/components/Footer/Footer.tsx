import Link from 'next/link';
import { getSiteSettings } from '@/lib/contentful/fetching/getSiteSettings';
import styles from './Footer.module.css';

// Note: No need to provide default values here, as the data is already filtered and defaults are applied in getSiteSettings.ts
export default async function Footer() {
  const {
    siteName,
    footer: { links, copyrightText, location },
  } = await getSiteSettings();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link
          href="/"
          aria-label={`${siteName} home`}
          className={styles.brand}
        >
          {siteName}
        </Link>

        <div className={styles.details}>
          <nav aria-label="Footer navigation">
            <ul className={styles.links}>
              {links.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link
                    href={link.href}
                    aria-label={link.accessibleLabel || link.label}
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className={styles.copyright}>
            {copyrightText} @ {location}
          </p>
        </div>
      </div>
    </footer>
  );
}
