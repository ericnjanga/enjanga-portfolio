import LibraryImageProvider from '@/components/LibraryProviders/LibraryImageProvider';
import LibraryNavigationProvider from '@/components/LibraryProviders/LibraryNavigationProvider';
import type { Metadata } from 'next';
import Footer from '@/components/Footer/Footer';
import TopNavbar from '@/components/TopNavbar/TopNavbar';
import 'enjanga-core-setup/typography.css';
import 'enjanga-core-setup/design-tokens.css';
import './globals.css';
import 'enjanga-components-library/navbar.css';
import 'enjanga-components-library/footer.css';
import 'enjanga-components-library/home-page.css';
import 'enjanga-components-library/button.css';
import 'enjanga-components-library/page-hero.css';
import 'enjanga-components-library/case-studies-page.css';
import 'enjanga-components-library/case-study-page.css';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var saved=localStorage.getItem('theme');var theme=saved==='light'||saved==='dark'?saved:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme}catch(e){}})()`,
          }}
        />
      </head>
      <body>
        <LibraryImageProvider>
          <LibraryNavigationProvider>
            <TopNavbar />
            {children}
            <Footer siteSettings={siteSettings} />
          </LibraryNavigationProvider>
        </LibraryImageProvider>
      </body>
    </html>
  );
}
