import styles from './SkipNavigationLink.module.scss';

const SkipNavigationLink = ({ destinationId }: { destinationId: string }) => (
  <a
    href={`#${destinationId}`}
    className={styles.skipLink}
    onClick={(e) => {
      e.preventDefault();
      document.querySelector('main')?.focus();
    }}
  >
    Skip to content
  </a>
);

export default SkipNavigationLink;
