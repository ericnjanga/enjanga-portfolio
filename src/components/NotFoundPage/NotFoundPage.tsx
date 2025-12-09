'use client';

import { useEffect } from 'react';
import { Link } from 'enjanga-core-setup/next';
import { AppHeaderWrapper } from '@/components/AppHeader/AppHeader';
import { Content } from '@carbon/react';
import { AppUseUtility } from '@/utils/UtilityContext';

export function NotFoundPage() {
  const { brand } = AppUseUtility();

  // Fix for sticky 404 content
  useEffect(() => {
    window.history.replaceState(null, '', window.location.pathname);
  }, []);

  return (
    <div>
      <AppHeaderWrapper />
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
