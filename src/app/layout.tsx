import type { Metadata } from 'next';
import ServerNavbar from '@/components/Navbar/Navbar';
import './globals.css';
import { getNavigation } from '@/lib/contentful/fetching/getNavigation';
import { getSiteSettings } from '@/lib/contentful/fetching/getSiteSettings';

export const metadata: Metadata = {
  title: 'Eric Njanga',
  description: 'Eric Njanga is a software engineer and web developer specializing in building modern web applications.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigation = await getNavigation();
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body>
        <ServerNavbar navigation={navigation} />
        {children}
      </body>
    </html>
  );
}
