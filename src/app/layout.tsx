// src/app/layout.tsx
import type { Metadata } from "next";
import "enjanga-core-setup/carbon-css"; // Carbon global styles
import "enjanga-components-library/styles.css"; // Custom library styles
import "@/styles/globals.scss";
import { ReactNode } from "react";
import ClientProviders from "./client-providers";
import Script from "next/script";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { Suspense } from "react";
import { getMetadata } from "@/libs/metadata";
import { contentfulContentIds } from '@/libs/contentful/contentful-queryConfig';
import { getDataEntry } from '@utils/dataProcessing';
import type { DataFor1 } from '@utils/dataProcessing/types';




/**
 * 
 * @returns 
 */
export async function generateMetadata(): Promise<Metadata> {
  return await getMetadata();
}



export default async function RootLayout({ children }: { children: ReactNode }) {
  // ...
  const footerIds = {
    'QR code': contentfulContentIds.singleEntries['QR code'],
    'QR code text': contentfulContentIds.singleEntries['QR code text'],
    'Published Work': contentfulContentIds.singleEntries['Links (Published Work)'],
};
  // Fetching all data needed for this page
  const dataFooter = [
    await getDataEntry('FooterLinks --Entry--' as DataFor1, footerIds['QR code']),
    await getDataEntry('FooterLinks --Entry--' as DataFor1, footerIds['QR code text']),
    await getDataEntry('FooterLinks --Entry--' as DataFor1, footerIds['Published Work'])
  ];

  return (
    <html lang="en">
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
        <ClientProviders footer={dataFooter}>
          {children}
          <Suspense>
            <AnalyticsProvider /> {/* 👈 Google Analytics Tracking */}
          </Suspense>
        </ClientProviders>
      </body>
    </html>
  );
}
