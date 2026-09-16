'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    setTheme(
      document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
    );
  }, []);

  function toggleTheme(nextTheme: Theme) {
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  }

  return { theme, toggleTheme };
}
