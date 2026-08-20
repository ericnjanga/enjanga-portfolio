export type Navigation = {
  name: string | null;
  location: string | null;
  itemsCollection: {
    items: Array<ContentFulNavigationItem | null>;
  } | null;
};

export type NavigationItem = {
  id: string;
  name: string;
  href: string;
  openInNewTab: boolean;
};

export type ContentFulNavigationItem = {
  __typename: 'NavigationItem';
  sys: {
    id: string;
  };
  name: string | null;
  destinationType: 'page' | 'homeSection' | 'external' | null;
  path: string | null;
  sectionId: string | null;
  openInNewTab: boolean | null;
  isVisible: boolean | null;
};

export type NavigationResponse = {
  data?: {
    navigationCollection?: {
      items: Array<Navigation | null>;
    };
  };
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
  }>;
};

export type ContentFulFooterLink = {
  label: string | null;
  linkType: 'internal' | 'external' | null;
  externalUrl: string | null;
  openInNewTab: boolean | null;
  accessibleLabel: string | null;
};

export type FooterLink = {
  label: string;
  href: string;
  openInNewTab: boolean;
  accessibleLabel?: string;
};

export type NavbarData = {
  siteName: string;
  navigation: NavigationItem[];
};

export type FooterData = {
  siteName: string;
  copyrightText: string;
  location: string;
  links: FooterLink[];
};

export type SiteSettingsResponse = {
  navbar: NavbarData;
  footer: FooterData;
};

export type ContentfulSiteSettingsResponse = {
  data?: {
    siteSettingsCollection?: {
      items: Array<{
        siteName: string | null;
        primaryNavigation: Navigation | null;
        footerLinksCollection: {
          items: Array<ContentFulFooterLink | null>;
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
