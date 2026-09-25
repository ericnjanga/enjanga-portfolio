import 'server-only';

import { cache } from 'react';
import { SiteSettingsDocument } from '../generated/graphql';
import { execute, isTemporaryContentfulError } from '../client/execute';
import { normalizeNavigationItem, normalizeLink } from '../transformations';
import { SiteSettingsData } from '../models';
import { siteSettingsFallback } from '../fallbacks';

export const getSiteSettings = cache(async () => {
  const result = await execute(SiteSettingsDocument, {}).catch((error: unknown) => {
    if (!isTemporaryContentfulError(error)) throw error;
    // Only optional site chrome degrades. Essential page queries still throw,
    // allowing ISR to retain its last successful page when regeneration fails.
    console.warn('[Contentful] using local site settings after temporary failure');
    return null;
  });

  // ...
  const globalSettings = result?.siteSettingsCollection?.items[0];

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
