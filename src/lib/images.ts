import { getImageProps } from 'next/image';

/** Native video posters need a URL, not a React renderer. Use the same optimizer. */
export function getVideoPosterSrc(image?: {
  url: string;
  width: number;
  height: number;
}): string | undefined {
  if (!image) return undefined;
  return getImageProps({
    src: image.url,
    alt: '',
    width: 640,
    height:
      image.width > 0
        ? Math.max(1, Math.round((640 * image.height) / image.width))
        : 360,
  }).props.src;
}
