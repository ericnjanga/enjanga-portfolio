import { siteSettingsQuery } from '../queries';
import type {
  ContentfulSiteSettingsResponse,
  ContentFulFooterLink,
  ContentFulNavigationItem,
  FooterLink,
  NavigationItem,
  SiteSettingsResponse,
} from '../types';
import { resolveHref } from '../utils';

const getFilteredNavItems = (
  items: Array<ContentFulNavigationItem | null> | null | undefined
): NavigationItem[] => {
  if (!items) return [];

  return items
    .filter(
      (item): item is ContentFulNavigationItem =>
        item?.__typename === 'NavigationItem' &&
        item?.isVisible !== false &&
        Boolean(item.name)
    )
    .map(
      (item): NavigationItem => ({
        id: item.sys.id,
        name: item.name ?? '',
        href: resolveHref(item),
        openInNewTab: item.openInNewTab ?? false,
      })
    );
};

const getFilteredFooterLinks = (
  links: Array<ContentFulFooterLink | null> | null | undefined
): FooterLink[] => {
  if (!links) return [];

  return links
    .filter((link): link is ContentFulFooterLink =>
      Boolean(link?.label && link.externalUrl)
    )
    .map((link) => ({
      label: link.label ?? '',
      href: link.externalUrl ?? '',
      openInNewTab: link.openInNewTab ?? false,
      accessibleLabel: link.accessibleLabel || undefined,
    }));
};

export async function getSiteSettings(): Promise<SiteSettingsResponse> {
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
      body: JSON.stringify({ query: siteSettingsQuery }),

      // Refresh Contentful content at most every 5 minutes (300 seconds)
      next: { revalidate: 300 },
    }
  );

  const result: ContentfulSiteSettingsResponse = await response.json();

  if (!response.ok || result.errors?.length) {
    const details =
      result.errors?.map(({ message }) => message).join(', ') ||
      `HTTP ${response.status}`;

    throw new Error(`Contentful request failed: ${details}`);
  }

  const globalSettings = result?.data?.siteSettingsCollection?.items[0];
  const siteName = globalSettings?.siteName ?? 'Eric Njanga';

  return {
    navbar: {
      siteName,
      navigation: getFilteredNavItems(
        globalSettings?.primaryNavigation?.itemsCollection?.items
      ),
    },
    footer: {
      siteName,
      copyrightText: globalSettings?.copyrightText ?? 'Copyright',
      location: globalSettings?.location ?? 'Toronto, Canada',
      links: getFilteredFooterLinks(
        globalSettings?.footerLinksCollection?.items
      ),
    },
  };
}
