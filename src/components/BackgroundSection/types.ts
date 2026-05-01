export type BackgroundSectionProps = {
  id?: string;
  className?: string;
  ariaLabelledby?: string;
  tabIndex?: number;
  title?: React.ReactElement;
  imageUrl?: string | null;
  parallax?: boolean; // Enable/disable parallax
  children: React.ReactNode;
};