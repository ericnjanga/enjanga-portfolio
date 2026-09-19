import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import { InteractiveImage } from 'enjanga-components-library';
import LibraryImageProvider from '../LibraryProviders/LibraryImageProvider';
import PortfolioImage from './PortfolioImage';
import { getVideoPosterSrc } from '@/lib/images';

const src = 'https://images.ctfassets.net/z41mabrhnu57/asset/hash/photo.jpg';
afterEach(cleanup);

test('library images use same-origin responsive URLs through the portfolio provider', () => {
  render(
    <LibraryImageProvider>
      <InteractiveImage
        src={src}
        alt="Portrait"
        width={1200}
        height={800}
        sizes="50vw"
      />
    </LibraryImageProvider>
  );
  const image = screen.getByRole('img', { name: 'Portrait' });
  expect(image.getAttribute('src')).toMatch(/^\/_next\/image\?/);
  expect(image.getAttribute('srcset')).toContain('/_next/image?');
  expect(image).toHaveAttribute('sizes', '50vw');
  expect(image).toHaveAttribute('width', '1200');
});

test('dimensionless card images fill their existing media frame', () => {
  render(
    <LibraryImageProvider>
      <InteractiveImage src={src} alt="Card" />
    </LibraryImageProvider>
  );
  expect(screen.getByRole('img')).toHaveAttribute('data-nimg', 'fill');
});

test('article images keep their intrinsic dimensions and lazy loading', () => {
  render(
    <PortfolioImage
      src={src}
      alt="Figure"
      width={900}
      height={600}
      loading="lazy"
      sizes="960px"
    />
  );
  expect(screen.getByRole('img')).toHaveAttribute('height', '600');
  expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy');
  expect(screen.getByRole('img').getAttribute('src')).toMatch(
    /^\/_next\/image\?/
  );
});

test('native poster URL uses the optimizer without transforming the video source', () => {
  const poster = getVideoPosterSrc({ url: src, width: 1200, height: 800 });
  const parsed = new URL(poster!, 'https://www.enjanga.com');
  expect(parsed.pathname).toBe('/_next/image');
  expect(parsed.searchParams.get('url')).toBe(src);
  expect(Number(parsed.searchParams.get('w'))).toBeLessThanOrEqual(1920);
  expect(getVideoPosterSrc()).toBeUndefined();
});
