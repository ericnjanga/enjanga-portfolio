'use client';

import { useEffect, useState } from 'react';
import styles from './TopNavbar.module.css';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
    );
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      aria-pressed={isDark}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.7 15.1A9 9 0 0 1 8.9 3.3 9 9 0 1 0 20.7 15.1Z" />
        </svg>
      )}
    </button>
  );
}
