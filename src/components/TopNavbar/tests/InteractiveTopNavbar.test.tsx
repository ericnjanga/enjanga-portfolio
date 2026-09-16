import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import InteractiveTopNavbar from '../InteractiveTopNavbar';
import { navigationFixture } from './navigationFixture';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

test('opens and closes the mobile menu', async () => {
  const user = userEvent.setup();

  render(<InteractiveTopNavbar navigation={navigationFixture} />);

  await user.click(screen.getByRole('button', { name: /open main menu/i }));

  expect(screen.getByRole('dialog', { name: /global/i })).toBeVisible();

  const [closeButton] = screen.getAllByRole('button', {
    name: /close main menu/i,
  });
  await user.click(closeButton);

  expect(
    screen.queryByRole('dialog', { name: /global/i })
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

  render(<InteractiveTopNavbar navigation={navigationFixture} />);

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

test('keeps desktop and mobile theme controls synchronized', async () => {
  document.documentElement.dataset.theme = 'light';
  const user = userEvent.setup();
  render(<InteractiveTopNavbar navigation={[]} />);

  const controls = screen.getAllByRole('button', { name: 'Switch to dark theme' });
  await user.click(controls[0]);

  expect(screen.getAllByRole('button', { name: 'Switch to light theme' })).toHaveLength(2);
  expect(document.documentElement.dataset.theme).toBe('dark');
  expect(localStorage.getItem('theme')).toBe('dark');

  await user.click(screen.getAllByRole('button', { name: 'Switch to light theme' })[1]);
  expect(screen.getAllByRole('button', { name: 'Switch to dark theme' })).toHaveLength(2);
  expect(localStorage.getItem('theme')).toBe('light');
});
