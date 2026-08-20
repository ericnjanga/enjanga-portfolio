import Link from 'next/link';
import type { FooterData } from '@/lib/contentful/types';
import { fallbackLinks } from './utils';

export default function Footer({
  siteName,
  links,
  copyrightText,
  location,
}: FooterData) {
  const footerLinks = links.length > 0 ? links : fallbackLinks;

  return (
    <footer className="bg-white text-slate-800">
      <div className="mx-auto grid max-w-[76rem] gap-10 px-6 py-14 sm:py-16 lg:grid-cols-[2fr_3fr] lg:px-0">
        <Link
          href="/"
          aria-label={`${siteName} home`}
          className="w-fit text-2xl font-bold tracking-tight"
        >
          {siteName}
        </Link>

        <div className="flex flex-col gap-8">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-16 gap-y-4">
              {footerLinks.map((link) => (
                <li key={`${link.label}-${link.href}`}>
                  <Link
                    href={link.href}
                    aria-label={link.accessibleLabel || link.label}
                    target={link.openInNewTab ? '_blank' : undefined}
                    rel={link.openInNewTab ? 'noopener noreferrer' : undefined}
                    className="text-base font-bold transition-colors hover:text-indigo-600 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-sm text-slate-700">
            {copyrightText} @ {location}
          </p>
        </div>
      </div>
    </footer>
  );
}
