

export function getSectionId(href: string) {
  if (href === '/') return 'home';

  try {
    const url = new URL(href, window.location.origin);
    return url.pathname === '/' && url.hash ? url.hash.slice(1) : null;
  } catch {
    return null;
  }
}