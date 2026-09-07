import { afterEach, expect, test, vi } from 'vitest';
import { getSiteSettings } from '@/lib/contentful/fetching/getSiteSettings';
import { execute } from '@/lib/contentful/client/execute';

vi.mock('server-only', () => ({}));
vi.mock('@/lib/contentful/client/execute', () => ({ execute: vi.fn() }));

afterEach(() => vi.clearAllMocks());

test('maps visible Contentful navigation items and excludes hidden items', async () => {
  vi.mocked(execute).mockResolvedValue({
    siteSettingsCollection: {
      items: [
        {
          primaryNavigation: {
            __typename: 'Navigation',
            itemsCollection: {
              items: [
                {
                  __typename: 'NavigationItem',
                  sys: { id: 'home' },
                  name: 'Home',
                  destinationType: 'page',
                  path: '/',
                  openInNewTab: false,
                  isVisible: true,
                },
                {
                  __typename: 'NavigationItem',
                  sys: { id: 'hidden' },
                  name: 'Hidden',
                  destinationType: 'page',
                  path: '/hidden',
                  isVisible: false,
                },
                null,
              ],
            },
          },
        },
      ],
    },
  });

  expect((await getSiteSettings()).navbar.navigation).toEqual([
    { id: 'home', name: 'Home', href: '/', openInNewTab: false },
  ]);
});
