import React, { useEffect, useState } from 'react';
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
  
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile once on mount
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

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
          className={`background-layer${parallax && !isMobile ? ' parallax' : ''}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {/* Dark overlay gradient */}
      <div className="background-overlay" />
    </section>
  );
};

export default BackgroundSection;
