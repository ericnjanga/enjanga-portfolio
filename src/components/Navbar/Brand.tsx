import Link from 'next/link';
import styles from './Navbar.module.css';

type BrandProps = {
  siteName?: string;
};

export function Brand({ siteName = 'Eric Njanga' }: BrandProps) {
  return (
    <Link
      href="/"
      aria-label={`${siteName} home`}
      className={styles.brand}
    >
      <span>{siteName}</span>
    </Link>
  );
}
