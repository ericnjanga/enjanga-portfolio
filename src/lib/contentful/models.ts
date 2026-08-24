/**

 * Normalized application models
 * (They remove Contentful-specific details and most null values)
 * -----------
 */
export type RichTextData = {
  json: unknown;
};

export type ImageData = {
  url: string;
  width: number;
  height: number;
  description: string;
}; 

export type HomePageData = { // Component-ready data structure ...
  seoTitle: string;
  seoDescription: string; 
  hero: HeroData; 
  expertiseSection: ExpertiseSectionData; 
  aboutSection: ContentSectionData; 
};

export type CaseStudiesPageData = { // Component-ready data structure ...
  seoTitle: string;
  seoDescription: string; 
  hero: HeroData; 
};

export type ContentSectionData = { // Component-ready data structure ...
  title: string; 
  body: RichTextData;
  image: ImageData; 
  imageAltText: string;
  imagePosition: string; 
  cta: LinkData;
};

export type SiteSettingsData = { // Component-ready data structure ...
  siteName: string;
  navbar: NavbarData;
  footer: FooterData;
};

export type NavbarData = { // Component-ready data structure ... 
  navigation: NavigationItemData[];
};

export type FooterData = { // Component-ready data structure ... 
  copyrightText: string;
  location: string;
  links: LinkData[];
};

export type NavigationItemData = { // Component-ready data structure ...
  id: string;
  name: string;
  href: string;
  openInNewTab: boolean;
};

export type LinkData = { // Component-ready data structure ...
  label: string;
  href: string;
  openInNewTab: boolean;
  accessibleLabel?: string;
};

export type HeroData = {
  title: string;
  subtitle: string;
};

export type ExpertiseItemData = {
  title: string;
  description: string;
};

export type ExpertiseSectionData = { 
  title: string;
  expertiseItemsCollection: {
    items: Array<ExpertiseItemData>;
  };
}; 