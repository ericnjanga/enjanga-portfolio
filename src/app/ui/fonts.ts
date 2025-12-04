/**
 * Add IBM Plex via next/font
 * ------------
 * Using the built-in Google font helpers.
 */

import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex-sans', // Will be reused in CSS vars
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-plex-mono', // Will be reused in CSS vars
});
