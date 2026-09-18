'use client';

import type { ReactNode } from 'react';
import { ImageProvider } from 'enjanga-components-library';
import PortfolioImage from './PortfolioImage';

export default function LibraryImageProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <ImageProvider component={PortfolioImage}>{children}</ImageProvider>;
}
