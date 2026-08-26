import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import MobileNavigation from '../MobileNavigation';
import NavbarNavigation from '../NavbarNavigation';
import { navigationFixture } from './navigationFixture';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

test('opens and closes the mobile menu', async () => {
  const user = userEvent.setup();

  render(<MobileNavigation navigation={navigationFixture} />);

  await user.click(screen.getByRole('button', { name: /open main menu/i }));

  expect(screen.getByRole('dialog', { name: /main menu/i })).toBeVisible();

  const [closeButton] = screen.getAllByRole('button', {
    name: /close menu/i,
  });
  await user.click(closeButton);

  expect(
    screen.queryByRole('dialog', { name: /main menu/i })
  ).not.toBeInTheDocument();
});

test('updates the active link and URL hash when the visible section changes', async () => {
  let expertiseTop = 900;
  const sections = [
    { id: 'home', top: () => expertiseTop - 900 },
    { id: 'expertise', top: () => expertiseTop },
    { id: 'about', top: () => expertiseTop + 900 },
  ];

  Object.defineProperty(document.documentElement, 'scrollHeight', {
    configurable: true,
    value: 3000,
  });

  sections.forEach(({ id, top }) => {
    const section = document.createElement('section');
    section.id = id;
    section.getBoundingClientRect = () => ({ top: top() } as DOMRect);
    document.body.appendChild(section);
  });

  render(<NavbarNavigation navigation={navigationFixture} />);

  await waitFor(() =>
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page'
    )
  );

  expertiseTop = -10;
  fireEvent.scroll(window);

  await waitFor(() => {
    expect(window.location.hash).toBe('#expertise');
    expect(screen.getByRole('link', { name: 'Expertise' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});
