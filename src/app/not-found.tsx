'use client'; // Add this if using client-side components

import { useEffect } from 'react';
import Link from 'next/link';
import { AppHeader, BrandLogo } from 'enjanga-components-library'; // ENJ NPM component library
import { GlobalActions, GlobalNav } from '../components/GlobalMenus';
import { Content } from '@carbon/react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  // Fix for sticky 404 content
  useEffect(() => {
    // Clear any route cache
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  return (
    <div>
      <AppHeader
        brandLabel="Eric Njanga"
        brandRoute="/"
        brand={<BrandLogo value="Brand Logo Here ..." />}
        navigation={<GlobalNav />}
        globalBarItems={<GlobalActions />}
      />
      <Content>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <h1>404 - Page Not Found</h1>
          <p>{`The page you're looking for doesn't exist or has been moved.`}</p>
          <Link
            href="/"
            style={{
              marginTop: '2rem',
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#0f62fe',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              transition: 'background-color 0.2s ease',
            }}
          >
            Return to Home
          </Link>
        </div>
      </Content>
    </div>
  );
}
