import Link from 'next/link';
import type { LinkData } from '@/lib/contentful/models';
import styles from './Home.module.css';

export default function ArrowLink({ link }: { link: LinkData }) {
  return (
    <Link
      href={link.href}
      aria-label={link.accessibleLabel || link.label}
      target={link.openInNewTab ? '_blank' : undefined}
      rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
      className={styles.cta}
    >
      <span className={styles.ctaLabel}>{link.label}</span>
      <span className={styles.ctaArrow} aria-hidden="true">
        →
      </span>
    </Link>
  );
}
