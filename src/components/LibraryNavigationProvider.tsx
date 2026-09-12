'use client';

import Link from 'next/link';
import { forwardRef, type ReactNode } from 'react';
import { LinkProvider, type LinkProps } from 'enjanga-components-library';

// Relative destinations belong to the portfolio. Absolute URLs and special
// schemes retain native browser behavior, as do downloads and new-tab links.
export const PortfolioLink = forwardRef<HTMLAnchorElement, LinkProps>(
  function PortfolioLink({ href, ...props }, ref) {
    const internal = !/^(?:[a-z][a-z\d+.-]*:|[\\/]{2})/i.test(href.trim());
    if (internal && props.download == null && (!props.target || props.target === '_self')) {
      return <Link {...props} href={href} ref={ref} />;
    }
    return <a {...props} href={href} ref={ref} />;
  }
);

export default function LibraryNavigationProvider({ children }: { children: ReactNode }) {
  return <LinkProvider component={PortfolioLink}>{children}</LinkProvider>;
}
