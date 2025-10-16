// src/app/layout.tsx
import type { Metadata } from "next";
import "enjanga-core-setup/carbon-css"; // Carbon global styles
import "enjanga-components-library/styles.css"; // Custom library styles
import "./../styles/_index.scss";
import { ReactNode } from "react";
import ClientProviders from "./client-providers";
import Script from "next/script";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title:
    "Bilingual Software Engineer | Front-End & Design Technology Specialist | Building UX-Focused Engineering Solutions | Turning Ideas into Business-Ready Solutions",
  description:
    "Solution Engineer with 10+ years of experience creating high-performance web applications, showcasing business impact through technical storytelling.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
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
        <ClientProviders>
          {children}
          <Suspense>
            <AnalyticsProvider /> {/* 👈 Google Analytics Tracking */}
          </Suspense>
        </ClientProviders>
      </body>
    </html>
  );
}
