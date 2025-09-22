import type { Metadata } from 'next';
import ClientLayout from './client-layout';
import 'enjanga-core-setup/carbon-css'; // Carbon global styles
import 'enjanga-components-library/styles.css'; // Custom library styles
import './../styles/_index.scss';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title:
    'Bilingual Software Engineer | Front-End & Design Technology Specialist | Building UX-Focused Engineering Solutions | Turning Ideas into Business-Ready Solutions',
  description:
    'Solution Engineer with 10+ years of experience creating high-performance web applications, showcasing business impact through technical storytelling.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
