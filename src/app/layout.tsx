import type { Metadata } from 'next';
import ClientLayout from './client-layout';
import 'enjanga-components-library/styles.css';
import './../styles/globals.scss';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title:
    'Eric Njanga | Solution Engineer | Showcasing Business Impact Through Technical Storytelling',
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
