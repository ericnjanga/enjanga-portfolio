import type { Metadata } from 'next';
import Footer from '@/components/Footer/Footer';
import ServerNavbar from '@/components/Navbar/Navbar';
import { SiteSettingsProvider } from '@/components/SiteSettings/SiteSettingsProvider';
import './globals.css';
import { getSiteSettings } from '@/lib/contentful/fetching/getSiteSettings';

export const metadata: Metadata = {
  title: 'Eric Njanga',
  description:
    'Eric Njanga is a software engineer and web developer specializing in building modern web applications.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body>
        <ServerNavbar />
        <SiteSettingsProvider value={siteSettings}>
          {children}
        </SiteSettingsProvider>
        <Footer />
      </body>
    </html>
  );
}
