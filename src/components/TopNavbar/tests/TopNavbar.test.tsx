import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TopNavbar from '../TopNavbar';
import { navigationFixture } from './navigationFixture';

// Vitest runs outside Next.js's server environment; mock only the marker.
vi.mock('server-only', () => ({}));

const getSiteSettingsMock = vi.hoisted(() => vi.fn());

vi.mock('@/lib/contentful/fetching/getSiteSettings', () => ({
  getSiteSettings: getSiteSettingsMock,
}));

test('renders navigation links', async () => {
  getSiteSettingsMock.mockResolvedValue({
    siteName: 'Test site',
    navbar: { navigation: navigationFixture },
    footer: {
      copyrightText: 'Copyright',
      location: 'Toronto, Canada',
      links: [],
    },
  });

  render(await TopNavbar());

  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
    'href',
    '/'
  );

  expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
    'href',
    '/work'
  );
});
