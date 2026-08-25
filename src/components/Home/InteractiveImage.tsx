'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ImageData, LinkData } from '@/lib/contentful/models';
import styles from './InteractiveImage.module.css';

type InteractiveImageProps = {
  image: ImageData;
  alt: string;
  link?: LinkData | null;
  interactionLabel?: string;
  className?: string;
};

const RIPPLE_DURATION = 480;

export default function InteractiveImage({
  image,
  alt,
  link,
  interactionLabel,
  className = '',
}: InteractiveImageProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLAnchorElement>(null);
  const navigationTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isRippling, setIsRippling] = useState(false);

  const label = interactionLabel || link?.label || 'Explore';

  useEffect(() => {
    return () => {
      if (navigationTimerRef.current) clearTimeout(navigationTimerRef.current);
    };
  }, []);

  function updatePointer(clientX: number, clientY: number) {
    const container = containerRef.current;
    if (!container) return;

    const bounds = container.getBoundingClientRect();
    container.style.setProperty('--pointer-x', `${clientX - bounds.left}px`);
    container.style.setProperty('--pointer-y', `${clientY - bounds.top}px`);
  }

  function navigate(pendingWindow?: Window | null) {
    if (!link) return;

    if (link.openInNewTab) {
      if (pendingWindow) {
        pendingWindow.location.href = link.href;
      } else {
        window.open(link.href, '_blank', 'noopener,noreferrer');
      }
      return;
    }

    if (/^https?:\/\//.test(link.href)) {
      window.location.assign(link.href);
      return;
    }

    router.push(link.href);
  }

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!link || isRippling) return;

    event.preventDefault();
    updatePointer(event.clientX, event.clientY);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate();
      return;
    }

    const pendingWindow = link.openInNewTab
      ? window.open('', '_blank', 'noopener,noreferrer')
      : null;

    setIsRippling(true);
    navigationTimerRef.current = setTimeout(
      () => navigate(pendingWindow),
      RIPPLE_DURATION
    );
  }

  return (
    <a
      ref={containerRef}
      href={link?.href}
      target={link?.openInNewTab ? '_blank' : undefined}
      rel={link?.openInNewTab ? 'noopener noreferrer' : undefined}
      aria-label={link?.accessibleLabel || (link ? label : undefined)}
      className={`${styles.interactiveImage} ${className}`}
      data-interactive={link ? 'true' : 'false'}
      data-rippling={isRippling ? 'true' : 'false'}
      onClick={handleClick}
      onPointerMove={(event) => updatePointer(event.clientX, event.clientY)}
      onAnimationEnd={() => setIsRippling(false)}
    >
      {/* Contentful images are already optimized at source. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.url}
        alt={alt || image.description}
        width={image.width}
        height={image.height}
      />

      {link && (
        <span className={styles.cursorMessage} aria-hidden="true">
          {label}
          <span>↗</span>
        </span>
      )}

      <span className={styles.ripple} aria-hidden="true" />
    </a>
  );
}
