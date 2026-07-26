import React from 'react';
import type { BackgroundSectionProps } from './types';
import './_background-section.scss';

const BackgroundSection = ({
  id,
  className,
  ariaLabelledby,
  tabIndex,
  parallax = false,
  imageUrl,
  children,
}: BackgroundSectionProps) => {
  return (
    <section
      id={id}
      className={`background-section ${className ?? ''}`}
      aria-labelledby={ariaLabelledby}
      tabIndex={tabIndex}
    >
      {/* Foreground content */}
      <div className="background-content">{children}</div>

      {/* Background image layer */}
      {imageUrl && (
        <div
          className={`background-layer${parallax ? ' parallax' : ''}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
          aria-hidden="true"
        />
      )}

      {/* Dark overlay gradient */}
      <div className="background-overlay" aria-hidden="true" />
    </section>
  );
};

export default BackgroundSection;
