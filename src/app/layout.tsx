// src/app/layout.tsx
import type { Metadata } from 'next';
import 'enjanga-core-setup/carbon-css'; // Carbon global styles
import 'enjanga-components-library/styles.css'; // Custom library styles
import './../styles/_index.scss';
import { ReactNode } from 'react';
import ClientProviders from './client-providers';

export const metadata: Metadata = {
  title:
    'Bilingual Software Engineer | Front-End & Design Technology Specialist | Building UX-Focused Engineering Solutions | Turning Ideas into Business-Ready Solutions',
  description:
    'Solution Engineer with 10+ years of experience creating high-performance web applications, showcasing business impact through technical storytelling.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* 👇 this wrapper runs only in the browser */}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
