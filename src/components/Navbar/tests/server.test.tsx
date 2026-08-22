import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Navbar from '../Navbar';
import { navigationFixture } from './navigationFixture';

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

  render(await Navbar());

  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
    'href',
    '/'
  );

  expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
    'href',
    '/work'
  );
});
