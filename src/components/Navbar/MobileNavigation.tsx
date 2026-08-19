'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { NavigationItem } from '@/lib/contentful/types';
import { Brand } from './Brand';

type MobileNavigationProps = {
  navigation: NavigationItem[];
};

export default function MobileNavigation({
  navigation,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
          className="size-6"
        >
          <path
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div id="mobile-menu" className="lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setIsOpen(false)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div className="flex items-center justify-between">
              <Brand />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="size-6"
                >
                  <path
                    d="M6 18 18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      target={item.openInNewTab ? '_blank' : undefined}
                      rel={
                        item.openInNewTab ? 'noopener noreferrer' : undefined
                      }
                      onClick={() => setIsOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
