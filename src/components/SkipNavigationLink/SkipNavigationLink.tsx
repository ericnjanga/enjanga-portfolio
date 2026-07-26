import styles from './SkipNavigationLink.module.scss';

const SkipNavigationLink = ({ destinationId }: { destinationId: string }) => (
  <a
    href={`#${destinationId}`}
    className={styles.skipLink}
    onClick={(e) => {
      e.preventDefault();
      const destination = document.getElementById(destinationId);
      destination?.focus();
      window.history.replaceState(null, '', `#${destinationId}`);
    }}
  >
    Skip to content
  </a>
);

export default SkipNavigationLink;
