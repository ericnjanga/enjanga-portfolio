// src/app/layout.tsx
import type { Metadata } from 'next';
import 'enjanga-core-setup/carbon-css'; // Carbon global styles
import 'enjanga-components-library/styles-base.css'; // Custom library styles
import '@/styles/index.scss';
import { ReactNode } from 'react';
import ClientProviders from './client-providers';
import Script from 'next/script';
import { AnalyticsProvider } from '@/components/AnalyticsProvider';
import { Suspense } from 'react';
import { getMetadata } from '@/libs/metadata';
import { contentfulContentIds } from '@/libs/contentful/contentful-queryConfig';
import { getDataEntry } from '@utils/dataProcessing';
import type { DataFor1 } from '@utils/dataProcessing/types';
import { fetchImageUrl } from '@utils/dataProcessing/fetchImageUrl';
import { ibmPlexSans, ibmPlexMono } from './ui/fonts';

/**
 * Global metadata fallback, used only when a route does not provide custom metadata.
 * (Serves home page metadata by default)
 * @returns
 */

export async function generateMetadata(): Promise<Metadata> {

  // Todo: 1) Move this constant to contentfulContentIds
  // Todo: 2) Ask chatGPT what would be a proper way to organize and rename contentfulContentIds
  const HOME_PAGE_ID = '6uIC6XwEgQp1s1fU1mJey1';
  
  return await getMetadata(HOME_PAGE_ID);
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Fetching all data needed for this page
  const [qrCode, qrCodeText, pubWork, imgUrl] = await Promise.all([
    getDataEntry(
      'FooterLinks --Entry--' as DataFor1,
      contentfulContentIds.singleEntries['QR code']
    ),
    getDataEntry(
      'FooterLinks --Entry--' as DataFor1,
      contentfulContentIds.singleEntries['QR code text']
    ),
    getDataEntry(
      'FooterLinks --Entry--' as DataFor1,
      contentfulContentIds.singleEntries['Links (Published Work)']
    ),
    fetchImageUrl(contentfulContentIds.categories['Banner Image']),
  ]);

  return (
    <>
    {/** 
     * - ibmPlexSans.className → applies font-family: <hashed IBM Plex Sans> to <html> so everything inherits IBM Plex by default. 
     * - ibmPlexSans.variable / ibmPlexMono.variable → still give you --font-plex-sans and --font-plex-mono if you want to use them in CSS.
     * */}
    <html lang="en" className={`${ibmPlexSans.className} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        {/* 👇 Client-only providers and analytics */}
        <ClientProviders
          dataValue={{
            footer: [qrCode, qrCodeText, pubWork],
            banners: { imgUrl },
          }}>
          {children}
          <Suspense>
            <AnalyticsProvider /> {/* 👈 Google Analytics Tracking */}
          </Suspense>
        </ClientProviders>
      </body>
    </html>
    </>
  );
}
