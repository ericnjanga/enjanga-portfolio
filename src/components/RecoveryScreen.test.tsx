import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import RecoveryScreen from './RecoveryScreen';
import GlobalError from '@/app/global-error';

it('offers an accessible retry and return link without CMS providers', async () => {
  const retry = vi.fn();
  render(<RecoveryScreen caseStudy retry={retry} />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('case study is temporarily unavailable');
  expect(screen.getByRole('link', { name: 'Back to case studies' })).toHaveAttribute('href', '/case-studies');
  await userEvent.setup().click(screen.getByRole('button', { name: 'Try again' }));
  expect(retry).toHaveBeenCalledOnce();
});

it('supplies a standalone document for root-layout failures', () => {
  const html = renderToStaticMarkup(<GlobalError />);
  expect(html).toContain('<html lang="en">');
  expect(html).toContain('<body');
  expect(html).toContain('This page is temporarily unavailable');
  expect(html).toContain('Back to home');
});
