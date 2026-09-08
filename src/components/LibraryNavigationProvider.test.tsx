import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Button } from 'enjanga-components-library';
import LibraryNavigationProvider from './LibraryNavigationProvider';

vi.mock('next/link', async () => { const { forwardRef } = await import('react'); return ({ default: forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  function MockLink(props, ref) { return <a {...props} ref={ref} data-next-link="true" />; }
)}); });

describe('portfolio Button routing', () => {
  it.each(['/case-studies/example', '/#about', '#section', '?page=2', './example'])(
    'uses Next Link for %s and forwards its ref and appearance', href => {
      const ref = createRef<HTMLAnchorElement>();
      render(<LibraryNavigationProvider><Button href={href} ref={ref} variant="secondary">Read</Button></LibraryNavigationProvider>);
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('data-next-link', 'true');
      expect(link).toHaveAttribute('href', href);
      expect(link).toHaveClass('enj-button--secondary');
      expect(ref.current).toBe(link);
    }
  );
  it.each(['https://example.com', '//example.com', 'mailto:hello@example.com', 'tel:123'])(
    'keeps %s as a native anchor', href => {
      render(<LibraryNavigationProvider><Button href={href}>Visit</Button></LibraryNavigationProvider>);
      expect(screen.getByRole('link')).not.toHaveAttribute('data-next-link');
    }
  );
  it('preserves downloads, new tabs, and button semantics', () => {
    render(<LibraryNavigationProvider>
      <Button href="/resume.pdf" download>Download</Button>
      <Button href="/case-studies" target="_blank">New tab</Button>
      <Button disabled>Action</Button>
    </LibraryNavigationProvider>);
    expect(screen.getByRole('link', { name: 'Download' })).not.toHaveAttribute('data-next-link');
    expect(screen.getByRole('link', { name: 'New tab' })).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
