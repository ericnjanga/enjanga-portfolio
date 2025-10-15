export type BackgroundSectionProps = {
  id?: string;
  className?: string;
  ariaLabelledby?: string;
  tabIndex?: number;
  imageId: string; // Contentful asset ID
  parallax?: boolean; // Enable/disable parallax
  children: React.ReactNode;
};