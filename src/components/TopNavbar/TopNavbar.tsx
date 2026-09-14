import 'server-only';
import { getSiteSettings } from '@/lib/contentful/fetching/getSiteSettings';
import InteractiveTopNavbar from './InteractiveTopNavbar';

// Note: No need to provide default values here, as the data is already filtered and defaults are applied in getSiteSettings.ts
export default async function TopNavbar() {
  const {
    siteName,
    navbar: { navigation },
  } = await getSiteSettings();

  return <InteractiveTopNavbar navigation={navigation} siteName={siteName} />;
}
