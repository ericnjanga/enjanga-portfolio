import { navigationQuery } from '../queries';
import type { Navigation, NavigationItem, ContentFulNavigationItem, NavigationResponse } from '../types';
import { resolveHref } from '../utils';


export async function getNavigation(): Promise<NavigationItem[]> {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environment = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';
  const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;

  if (!spaceId || !environment || !deliveryToken) {
    throw new Error('Contentful environment variables are not set.');
  } 

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${deliveryToken}`,
      },
      body: JSON.stringify({ query: navigationQuery }),

      // Refresh Contentful content at most every 5 minutes (300 seconds)
      next: { revalidate: 300 },
    }
  );

  const result: NavigationResponse = await response.json();

  if (!response.ok || result.errors?.length) {
    const details =
      result.errors?.map(({ message }) => message).join(', ') ||
      `HTTP ${response.status}`;

    throw new Error(`Contentful request failed: ${details}`);
  }

  const navigation = result.data?.navigationCollection?.items[0];
  const items = navigation?.itemsCollection?.items ?? [];

  return items
    .filter((item): item is ContentFulNavigationItem => item?.__typename === 'NavigationItem' && item?.isVisible !== false && Boolean(item.name))
    .map((item): NavigationItem => ({
      id: item.sys.id,
      name: item.name ?? '',
      href: resolveHref(item),
      openInNewTab: item.openInNewTab ?? false,
    })) ;
}