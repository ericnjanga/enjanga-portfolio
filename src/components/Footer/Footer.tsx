import 'server-only';
import { Footer as LibraryFooter } from 'enjanga-components-library';
import type { SiteSettingsData } from '@/lib/contentful/models';

type FooterProps = {
  siteSettings: Pick<SiteSettingsData, 'siteName' | 'footer'>;
};

/** Map server-fetched settings into the library's CMS-independent presentation. */
export default function Footer({ siteSettings }: FooterProps) {
  const { siteName, footer } = siteSettings;
  return (
    <LibraryFooter
      siteName={siteName}
      homeHref="/"
      links={footer.links.map(
        ({ label, href, accessibleLabel, openInNewTab }) => ({
          label,
          href,
          accessibleLabel,
          openInNewTab,
        })
      )}
      copyright={[footer.copyrightText, footer.location]
        .filter(Boolean)
        .join(' @ ')}
    />
  );
}
