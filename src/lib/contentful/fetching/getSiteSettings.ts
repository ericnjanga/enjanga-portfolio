import 'server-only';

import { cache } from 'react';
import { SiteSettingsDocument } from '../generated/graphql';
import { execute } from '../client/execute';

// import type { ContentfulSiteSettingsResponse } from '../contentful-types';
import {
  normalizeNavItems,
  normalizeLink,
} from '../transformations';
import { SiteSettingsData } from '../models';
import { siteSettingsFallback } from '../fallbacks';

export const getSiteSettings = cache(async ()=> {
  const result = await execute(SiteSettingsDocument, {});

  const globalSettings = result?.siteSettingsCollection?.items[0];
  const siteName = globalSettings?.siteName ?? siteSettingsFallback.siteName;
  const navigation = normalizeNavItems(
          globalSettings?.primaryNavigation?.itemsCollection?.items
        );
  const footerLinks = normalizeLink(globalSettings?.footerLinksCollection?.items);

  return {
    siteName,
    navbar: {
      navigation:
        navigation.length > 0 ? navigation :
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
        footerLinks?.length > 0 ? footerLinks :
        ([
          ...siteSettingsFallback.footer.links,
        ] as SiteSettingsData['footer']['links']),
    },
  };
});
