import 'server-only';

import { cache } from 'react';
import { siteSettingsQuery } from '../queries';
import type { ContentfulSiteSettingsResponse } from '../contentful-types';
import {
  getFilteredNavItems,
  getFilteredFooterLinks,
} from '../transformations';
import { SiteSettingsData } from '../models';
import { siteSettingsFallback } from './fallbacks';

export const getSiteSettings = cache(async (): Promise<SiteSettingsData> => {
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
  const siteName = globalSettings?.siteName ?? siteSettingsFallback.siteName;

  return {
    siteName,
    navbar: {
      navigation:
        getFilteredNavItems(
          globalSettings?.primaryNavigation?.itemsCollection?.items
        ) ??
        ([
          ...siteSettingsFallback.navbar.navigation,
        ] as SiteSettingsData['navbar']['navigation']),
    },
    footer: {
      copyrightText:
        globalSettings?.copyrightText ??
        siteSettingsFallback.footer.copyrightText,
      location:
        globalSettings?.location ?? siteSettingsFallback.footer.location,
      links:
        getFilteredFooterLinks(globalSettings?.footerLinksCollection?.items) ??
        ([
          ...siteSettingsFallback.footer.links,
        ] as SiteSettingsData['footer']['links']),
    },
  };
});
