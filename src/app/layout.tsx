import type { Metadata } from 'next';
import ClientLayout from './client-layout';
import 'enjanga-next-3-components-lib/styles.css';
import './styles/globals.scss';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Eric Njanga',
  description: 'Software engineer & Design technologist',
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
