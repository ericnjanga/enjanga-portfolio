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

    const items = Array.from(
      grid.querySelectorAll<HTMLElement>(':scope > .masonryGrid__item')
    );

    const updateItemSpan = (item: HTMLElement) => {
      const content = item.firstElementChild as HTMLElement | null;
      if (!content) return;

      const styles = window.getComputedStyle(grid);
      const rowHeight = Number.parseFloat(styles.gridAutoRows);
      const rowGap = Number.parseFloat(styles.rowGap);
      const contentHeight = content.getBoundingClientRect().height;

      if (!rowHeight || !contentHeight) return;

      const rowSpan = Math.ceil(
        (contentHeight + rowGap) / (rowHeight + rowGap)
      );
      item.style.gridRowEnd = `span ${rowSpan}`;
    };

    const updateGrid = () => {
      items.forEach(updateItemSpan);
    };

    const resizeObserver = new ResizeObserver(updateGrid);
    resizeObserver.observe(grid);
    items.forEach((item) => {
      const content = item.firstElementChild;
      if (content) resizeObserver.observe(content);
    });

    updateGrid();

    return () => resizeObserver.disconnect();
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
