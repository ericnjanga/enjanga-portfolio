'use client';

import React, { useLayoutEffect, useRef } from 'react';

type MasonryGridProps = {
  children: React.ReactNode;
  className?: string;
};

export default function MasonryGrid({
  children,
  className = '',
}: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    let animationFrame = 0;
    let isDisposed = false;

    const items = Array.from(
      grid.querySelectorAll<HTMLElement>(':scope > .masonryGrid__item')
    );

    const updateGrid = () => {
      const styles = window.getComputedStyle(grid);
      const rowHeight = Number.parseFloat(
        styles.getPropertyValue('--masonry-row-height')
      );
      const rowGap = Number.parseFloat(styles.rowGap) || 0;

      // If the masonry stylesheet has not loaded yet, retain the safe regular
      // grid. A later resize, media load, font load, or window load retries it.
      if (!rowHeight || styles.display !== 'grid') return;

      const spans = items.map((item) => {
        const content = item.firstElementChild as HTMLElement | null;
        const contentHeight = content?.getBoundingClientRect().height ?? 0;
        return contentHeight
          ? Math.max(
              1,
              Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap))
            )
          : 1;
      });

      items.forEach((item, index) => {
        item.style.gridRowEnd = `span ${spans[index]}`;
      });
      grid.dataset.masonryReady = 'true';
    };

    const scheduleUpdate = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateGrid);
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(grid);
    items.forEach((item) => {
      const content = item.firstElementChild;
      if (content) resizeObserver.observe(content);
    });

    const media = Array.from(
      grid.querySelectorAll<HTMLImageElement | HTMLVideoElement>('img, video')
    );
    media.forEach((element) => {
      element.addEventListener('load', scheduleUpdate);
      element.addEventListener('loadedmetadata', scheduleUpdate);
    });

    window.addEventListener('load', scheduleUpdate);
    document.fonts?.ready.then(() => {
      if (!isDisposed) scheduleUpdate();
    });
    scheduleUpdate();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('load', scheduleUpdate);
      media.forEach((element) => {
        element.removeEventListener('load', scheduleUpdate);
        element.removeEventListener('loadedmetadata', scheduleUpdate);
      });
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div
      ref={gridRef}
      className={`masonryGrid ${className}`.trim()}
      role="list"
    >
      {React.Children.map(children, (child) => (
        <div className="masonryGrid__item" role="listitem">
          {child}
        </div>
      ))}
    </div>
  );
}
