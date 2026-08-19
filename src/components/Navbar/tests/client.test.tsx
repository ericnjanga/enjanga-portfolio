import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MobileNavigation from '../MobileNavigation';
import { navigationFixture } from './navigationFixture';

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
