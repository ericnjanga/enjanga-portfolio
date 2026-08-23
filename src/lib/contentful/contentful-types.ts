
/**
 * Raw Contentful types:
 * (They appropriately preserve Contentful nullability)
 * -----------
 */ 
export type ContentfulSys = {
  id: string;
};

export type ContentfulRichText = {
  json: unknown;
};

export type ContentfulImage = {
  url: string | null;
  width: number | null;
  height: number | null;
  description: string | null;
};

export type ContentfulHero = {
  __typename: 'Hero';
  sys: ContentfulSys;
  title: string | null;
  subtitle: string | null;
};

export type ContentfulExpertiseSection = {
  __typename: 'ExpertiseSection';
  sys: ContentfulSys;
  title: string | null;
  expertiseItemsCollection: {
    items: Array<ContentfulExpertiseItem | null>;
  } | null;
  image: ContentfulImage | null; 
  imageAltText: string | null;
  cta: ContentfulLink | null;
};

export type ContentfulExpertiseItem = {
  __typename: 'ExpertiseItem';
  sys: ContentfulSys;
  title: string | null;
  description: string | null;
};
 
export type ContentfulContentSection = { 
  __typename: 'ContentSection';
  sys: ContentfulSys;
  title: string | null;

  body: ContentfulRichText; 
  image: ContentfulImage | null; 
  imageAltText: string | null;
  imagePosition: string | null; 
  cta: ContentfulLink | null;
}; 

export type ContentfulNavigationItem = { // Row data from contentful ...
  __typename: 'NavigationItem';
  sys: ContentfulSys;
  name: string | null;
  destinationType: 'page' | 'homeSection' | 'external' | null;
  path: string | null;
  sectionId: string | null;
  openInNewTab: boolean | null;
  isVisible: boolean | null;
};

export type ContentfulLink = { // Row data from contentful ...
  __typename: 'Link';
  sys: ContentfulSys;
  label: string | null;
  linkType: 'internal' | 'external' | null;
  internalDestination: ContentfulInternalDestination | null;
  externalUrl: string | null;
  openInNewTab: boolean | null;
  accessibleLabel: string | null;
};

export type ContentfulNavigation = {
  __typename: 'Navigation';
  sys: ContentfulSys;
  name: string | null;
  location: string | null;
  itemsCollection: {
    items: Array<ContentfulNavigationItem | null>;
  } | null;
};

export type ContentfulCaseStudyPage = {
  __typename: 'CaseStudyPage';
  sys: ContentfulSys;
  slug: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  hero: ContentfulHero | null;
};

export type ContentfulInternalDestination = ContentfulHomePageReference | ContentfulCaseStudyPageReference;

export type ContentfulHomePageReference = {
  __typename: 'HomePage';
  sys: ContentfulSys;
  slug: string | null;
};

export type ContentfulCaseStudyPageReference = {
  __typename: 'CaseStudyPage';
  sys: ContentfulSys;
  slug: string | null;
};






/**
 * GraphQL envelopes
 * -----------
 */
export type ContentfulHomePageResponse = { // Row data from contentful ...
  data?: {
    homePageCollection?: {
      items: Array<{
        sys: ContentfulSys;
        slug: string | null;
        seoTitle: string | null;
        seoDescription: string | null;

        hero: ContentfulHero | null; 
        expertiseSection: ContentfulExpertiseSection | null; 
        aboutSection: ContentfulContentSection | null;
      } | null>;
    };
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
  }>;
};

export type ContentfulCaseStudiesPageResponse = { // Row data from contentful ...
  data?: {
    caseStudiesPageCollection?: {
      items: Array<ContentfulCaseStudyPage | null>;
    };
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
  }>;
};

export type ContentfulSiteSettingsResponse = { // Row data from contentful ...
  data?: {
    siteSettingsCollection?: {
      items: Array<{
        sys: ContentfulSys;
        siteName: string | null;
        primaryNavigation: ContentfulNavigation | null;
        footerLinksCollection: {
          items: Array<ContentfulLink | null>;
        } | null;
        copyrightText: string | null;
        location: string | null;
      } | null>;
    };
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
  }>;
};