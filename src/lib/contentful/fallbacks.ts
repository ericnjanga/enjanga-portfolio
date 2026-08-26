/**
 * TO DO:
 * --------------------
 * I need to create a notification that alert the Admin everytime a fallback is used instead of real data
 * NOTE: The notification should indicate the exact location and the reason why the fallback was used.
 */

import type {
  SiteSettingsData,
  LinkData,
  NavigationItemData,
  HomePageData,
  CaseStudiesPageData,
  ImageData,
} from './models';

export const navFallback: NavigationItemData[] = [
  { id: '1', name: 'Home', href: '/', openInNewTab: false },
  { id: '2', name: 'Expertise', href: '/#expertise', openInNewTab: false },
  { id: '3', name: 'About', href: '/#about', openInNewTab: false },
  {
    id: '4',
    name: 'Case Studies',
    href: '/case-studies',
    openInNewTab: false,
  },
];

export const fallbackLinks: LinkData[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ericnjanga',
    openInNewTab: true,
    accessibleLabel: "Visit Eric Njanga's LinkedIn profile",
  },
  {
    label: 'GitHub',
    href: 'https://github.com/ericnjanga',
    openInNewTab: true,
    accessibleLabel: "Visit Eric Njanga's GitHub profile",
  },
];

const siteNameFallback = 'Eric Njanga';

export const siteSettingsFallback: SiteSettingsData = {
  siteName: siteNameFallback,
  navbar: {
    navigation: [...navFallback],
  },
  footer: {
    copyrightText: 'Copyright',
    location: 'Toronto, Canada',
    links: [...fallbackLinks],
  },
};

export const aboutImageFallback: ImageData = {
  url: '/images/eric-njanga-portrait.jpeg',
  description: 'A picture of me.',
  width: 341,
  height: 512,
};

export const aboutCtaFallback: LinkData = {
  label: 'LinkedIn Profile',
  href: 'https://www.linkedin.com/in/ericnjanga',
  openInNewTab: true,
};

export const homePageFallback: HomePageData = {
  seoTitle: 'Eric Njanga — React and Next.js Engineer',
  seoDescription:
    'Front-end architecture, product engineering, and enterprise modernization.',
  hero: {
    title: 'Architecting modern enterprise interfaces.',
    subtitle:
      'I engineer scalable front-end systems that transform complex business requirements into intuitive, maintainable digital experiences.',
  },
  expertiseSection: {
    title: 'Engineering beyond the interface.',
    expertiseItemsCollection: {
      items: [
        {
          title: 'Core web app architecture',
          description:
            'I design scalable front-end architectures that turn complex business requirements into maintainable systems—connecting UI components, data, APIs, state, accessibility, performance, and testing into a cohesive application.',
        },
        {
          title: 'Product engineering',
          description:
            'I approach software as both an engineering system and a business product—balancing user experience, technical constraints, maintainability, and evolving business needs throughout the product lifecycle.',
        },
      ],
    },
    image: {
      url: '/images/enterprise-dashboard.png',
      width: 1024,
      height: 768,
      description: 'A dark enterprise task-management dashboard.',
    },
    imageAltText: 'Enterprise task-management dashboard interface',
    cta: { ...aboutCtaFallback },
  },
  aboutSection: {
    title: 'Technology in the modern enterprise context.',
    body: {
      json: {
        nodeType: 'document',
        content: [
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'My career has been shaped by large organizations, complex systems, and the challenge of bringing established software forward. Over the years, I’ve learned that successful modernization is about more than technology—it requires understanding users, business priorities, organizational constraints, and the people responsible for delivering change.',
                marks: [],
                data: {},
              },
            ],
            data: {},
          },
          {
            nodeType: 'paragraph',
            content: [
              {
                nodeType: 'text',
                value:
                  'That perspective shapes how I work today: combining front-end architecture, product thinking, and enterprise experience to help build software that remains useful, adaptable, and maintainable as organizations evolve.',
                marks: [],
                data: {},
              },
            ],
            data: {},
          },
        ],
      },
    },
    image: { ...aboutImageFallback },
    imageAltText: 'Eric Njanga wearing a pink blazer in downtown Toronto',
    imagePosition: 'left',
    cta: { ...aboutCtaFallback },
  },
};

export const caseStudiesPageFallback: CaseStudiesPageData = {
  seoTitle: 'case studies title...',
  seoDescription: 'case studies description...',
  hero: {
    title: 'case studies...',
    subtitle: 'case studies subtitle...',
  },
};
