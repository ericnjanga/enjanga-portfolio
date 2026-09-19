import { createRef, type AnchorHTMLAttributes } from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PortfolioLink } from './PortfolioLink';

vi.mock('next/link', async () => {
  const { forwardRef } = await import('react');
  return {
    default: forwardRef<HTMLAnchorElement, AnchorHTMLAttributes<HTMLAnchorElement>>(
      function MockLink(props, ref) {
        return <a {...props} ref={ref} data-next-link="true" />;
      }
    ),
  };
});

afterEach(cleanup);

describe('PortfolioLink', () => {
  it.each(['../case-studies', 'case-studies/example', '/work?view=grid#projects'])(
    'routes relative destination %s through Next Link',
    (href) => {
      render(<PortfolioLink href={href}>Work</PortfolioLink>);
      const link = screen.getByRole('link', { name: 'Work' });
      expect(link).toHaveAttribute('data-next-link', 'true');
      expect(link).toHaveAttribute('href', href);
    }
  );

  it.each([
    'HTTPS://example.com/work',
    '  https://example.com/work  ',
    'web+demo:project/42',
    '\\\\example.com/work',
  ])('keeps external destination %s native without rewriting it', (href) => {
    render(<PortfolioLink href={href}>External</PortfolioLink>);
    const link = screen.getByRole('link', { name: 'External' });
    expect(link).not.toHaveAttribute('data-next-link');
    expect(link).toHaveAttribute('href', href);
  });

  it('uses Next Link when the target explicitly selects the current window', () => {
    render(<PortfolioLink href="/work" target="_self">Work</PortfolioLink>);
    expect(screen.getByRole('link')).toHaveAttribute('data-next-link', 'true');
    expect(screen.getByRole('link')).toHaveAttribute('target', '_self');
  });

  it.each(['_blank', '_parent', '_top', 'preview-window'])(
    'keeps target %s native and preserves the supplied relationship',
    (target) => {
      render(
        <PortfolioLink href="/work" target={target} rel="noopener noreferrer">
          Work
        </PortfolioLink>
      );
      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('data-next-link');
      expect(link).toHaveAttribute('target', target);
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  );

  it.each([true, '', 'portfolio.pdf'])(
    'preserves download %j on a native anchor',
    (download) => {
      render(<PortfolioLink href="/resume.pdf" download={download}>Resume</PortfolioLink>);
      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('data-next-link');
      expect(link).toHaveAttribute('download', download === true ? '' : download);
    }
  );

  it.each(['/work', 'https://example.com/work'])(
    'forwards refs, accessible attributes, styles, and cancellable events for %s',
    (href) => {
      const ref = createRef<HTMLAnchorElement>();
      const onClick = vi.fn((event) => event.preventDefault());
      render(
        <PortfolioLink
          href={href}
          ref={ref}
          className="custom-link"
          aria-label="Explore work"
          aria-current="page"
          onClick={onClick}
        >
          <span>Work</span>
        </PortfolioLink>
      );
      const link = screen.getByRole('link', { name: 'Explore work' });
      expect(ref.current).toBe(link);
      expect(link).toHaveClass('custom-link');
      expect(link).toHaveAttribute('aria-current', 'page');
      expect(link).toHaveTextContent('Work');
      expect(fireEvent.click(link)).toBe(false);
      expect(onClick).toHaveBeenCalledOnce();
    }
  );
});
