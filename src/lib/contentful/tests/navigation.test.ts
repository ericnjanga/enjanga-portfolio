import { afterEach, describe, expect, test, vi } from 'vitest';
import { getNavigation } from '@/lib/contentful/fetching/getNavigation';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

test('maps visible Contentful navigation items', async () => {
  vi.stubEnv('CONTENTFUL_SPACE_ID', 'test-space');
  vi.stubEnv('CONTENTFUL_ENVIRONMENT', 'master');
  vi.stubEnv('CONTENTFUL_DELIVERY_TOKEN', 'test-token');

  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(
      JSON.stringify({
        data: {
          navigationCollection: {
            items: [
              {
                name: 'Primary navigation',
                location: 'header',
                itemsCollection: {
                  items: [
                    {
                      __typename: 'NavigationItem',
                      sys: { id: 'home' },
                      name: 'Home',
                      destinationType: 'page',
                      path: '/',
                      sectionId: null,
                      openInNewTab: false,
                      isVisible: true,
                    },
                  ],
                },
              },
            ],
          },
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  );

  await expect(getNavigation()).resolves.toEqual([
    {
      id: 'home',
      name: 'Home',
      href: '/',
      openInNewTab: false,
    },
  ]);
});
