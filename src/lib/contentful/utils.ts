import type { ContentFulNavigationItem } from './types';

export function resolveHref(item: ContentFulNavigationItem): string {
  switch (item.destinationType) {
    case 'homeSection':
      return item.sectionId ? `/#${item.sectionId}` : '/';

    case 'external':
    case 'page':
    default:
      return item.path || '/';
  }
}