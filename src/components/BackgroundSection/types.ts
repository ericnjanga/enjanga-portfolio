export type BackgroundSectionProps = {
  id?: string;
  className?: string;
  ariaLabelledby?: string;
  tabIndex?: number;
  imageUrl?: string | null;
  parallax?: boolean; // Enable/disable parallax
  children: React.ReactNode;
};