import React, { useEffect, useState } from 'react';
import type { BackgroundSectionProps } from './types';


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

  // Dark gradient overlay (mobile-safe)
  const gradient = 'linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8))';

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

    if (imageId) fetchImage();
  }, [imageId]);

  // Mobile detection to avoid parallax issues
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <section
      id={id}
      className={className}
      aria-labelledby={ariaLabelledby}
      tabIndex={tabIndex}
      style={{
        backgroundImage: imageUrl ? `${gradient}, url(${imageUrl})` : undefined,
        backgroundBlendMode: 'multiply', // ✅ critical for the gradient to apply correctly
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: parallax && !isMobile ? 'fixed' : 'scroll', // ✅ avoids mobile rendering bugs
      }}
    >
      {children}
    </section>
  );
};


export default BackgroundSection;
