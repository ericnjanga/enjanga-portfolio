import 'server-only';

import { cache } from 'react';
import { SiteSettingsDocument } from '../generated/graphql';
import { execute } from '../client/execute';
import { normalizeNavigationItem, normalizeLink } from '../transformations';
import { SiteSettingsData } from '../models';
import { siteSettingsFallback } from '../fallbacks';

export const getSiteSettings = cache(async () => {
  const result = await execute(SiteSettingsDocument, {});

  // ...
  const globalSettings = result.siteSettingsCollection?.items[0];

  // ...
  const siteName = globalSettings?.siteName ?? siteSettingsFallback.siteName;
  const primaryNavigation =
    globalSettings?.primaryNavigation?.__typename === 'Navigation'
      ? globalSettings.primaryNavigation
      : null;
  const navigation = (primaryNavigation?.itemsCollection?.items ?? []).flatMap(
    (item) => {
      // To do: FIndout what flatMap does ...
      if (item?.__typename !== 'NavigationItem') {
        return [];
      }

      const navigationItem = normalizeNavigationItem(item);

      return navigationItem ? [navigationItem] : [];
    }
  );

  // ...
  const footerLinks = (
    globalSettings?.footerLinksCollection?.items ?? []
  ).flatMap((entry) => {
    if (entry?.__typename !== 'Link') {
      return [];
    }

    const link = normalizeLink(entry);

    return link ? [link] : [];
  });

  // ...
  return {
    siteName,

    navbar: {
      navigation:
        navigation.length > 0
          ? navigation
          : [...siteSettingsFallback.navbar.navigation],
    },

    footer: {
      copyrightText:
        globalSettings?.copyrightText ??
        siteSettingsFallback.footer.copyrightText,

      location:
        globalSettings?.location ?? siteSettingsFallback.footer.location,

      links:
        footerLinks?.length > 0
          ? footerLinks
          : [...siteSettingsFallback.footer.links],
    },
  } satisfies SiteSettingsData;
});
