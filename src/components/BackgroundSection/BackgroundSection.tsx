import React, { useEffect, useState } from 'react';

type BackgroundSectionProps = {
  id?: string;
  className?: string;
  ariaLabelledby?: string;
  tabIndex?: number;
  imageId: string; // Contentful asset ID
  parallax?: boolean; // Enable/disable parallax
  children: React.ReactNode;
};

const BackgroundSection: React.FC<BackgroundSectionProps> = ({
  id,
  className,
  ariaLabelledby,
  tabIndex,
  imageId,
  parallax = false,
  children,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  // CSS background-blend-mode: It applies a nice linear gradient which darkens the background image
  const bgBlendMode = 'linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.8))'; 

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

  return (
    <section
      id={id}
      className={className}
      aria-labelledby={ariaLabelledby}
      tabIndex={tabIndex}
      style={{
        backgroundImage: imageUrl ? `${bgBlendMode}, url(${imageUrl})` : undefined,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundAttachment: parallax ? 'fixed' : 'scroll',
      }}
    >
      {children}
    </section>
  );
};

export default BackgroundSection;
