import Image from 'next/image';
import type { ImageProps } from 'enjanga-components-library';

/** Framework-specific delivery stays in the consuming application. */
export default function PortfolioImage({
  alt,
  width,
  height,
  sizes = '100vw',
  ...props
}: ImageProps) {
  // Library media frames already establish a positioned, sized container.
  const dimensions =
    width && height ? { width, height } : { fill: true as const };
  return <Image alt={alt} {...props} {...dimensions} sizes={sizes} />;
}
