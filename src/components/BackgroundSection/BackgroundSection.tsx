import React, { useEffect, useState } from 'react';
import type { BackgroundSectionProps } from './types';
import './_background-section.scss';

const BackgroundSection = ({
  id,
  className,
  ariaLabelledby,
  tabIndex,
  imageId,
  parallax = false,
  children,
}: BackgroundSectionProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
        const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

        const res = await fetch(
          `https://cdn.contentful.com/spaces/${SPACE_ID}/assets/${imageId}?access_token=${ACCESS_TOKEN}`
        );
        const data = await res.json();
        const url = data?.fields?.file?.url
          ? `https:${data.fields.file.url}`
          : null;
        setImageUrl(url);
      } catch (err) {
        console.error('Error fetching Contentful image:', err);
      }
    };

    fetchImage();

    // Detect mobile once on mount
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }
  }, [imageId]);

  return (
    <section
      id={id}
      className={`background-section ${className ?? ''}`}
      aria-labelledby={ariaLabelledby}
      tabIndex={tabIndex}
    >

      {/* ✅ Foreground content */}
      <div className="background-content">{children}</div>


      {/* ✅ Background image layer */}
      {imageUrl && (
        <div
          className={`background-layer${parallax && !isMobile ? ' parallax' : ''}`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}

      {/* ✅ Dark overlay gradient */}
      <div className="background-overlay" />
    </section>
  );
};

export default BackgroundSection;
