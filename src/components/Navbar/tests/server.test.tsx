import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar'
import { navigationFixture } from './navigationFixture';

test('renders navigation links', () => {
  render(<Navbar navigation={navigationFixture} />);

  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
    'href',
    '/'
  );

  expect(screen.getByRole('link', { name: 'Work' })).toHaveAttribute(
    'href',
    '/work'
  );
});