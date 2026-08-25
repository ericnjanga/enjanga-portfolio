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
  { id: '2', name: 'Expertise', href: '/expertise', openInNewTab: false },
  { id: '3', name: 'About', href: '/about', openInNewTab: false },
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
  url: '/images/profile-fallback.jpg',
  description: 'A picture of me.',
  width: 1052,
  height: 800,
};

export const aboutCtaFallback: LinkData = {
  label: 'Contact Me',
  href: '/contact',
  openInNewTab: false,
};

export const homePageFallback: HomePageData = {
  seoTitle: 'Welcome to My Portfolio',
  seoDescription: 'Explore my work and expertise in web development.',
  hero: {
    title: 'Welcome to My Portfolio',
    subtitle: 'Explore my work and expertise in web development.',
  },
  expertiseSection: {
    title: 'My Expertise',
    expertiseItemsCollection: {
      items: [
        {
          title: 'Web Development',
          description: 'Building responsive and dynamic web applications.',
        },
        {
          title: 'UI/UX Design',
          description: 'Creating user-friendly interfaces and experiences.',
        },
        {
          title: 'Content Management',
          description: 'Managing and optimizing content for the web.',
        },
      ],
    },
    image: null,
    imageAltText: '',
    cta: {
      label: 'View case studies',
      href: '/case-studies',
      openInNewTab: false,
    },
  },
  aboutSection: {
    title: 'About Me',
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
                  'I am a passionate web developer with experience in building modern web applications. I specialize in creating responsive designs and seamless user experiences.',
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
    imageAltText: 'Profile picture of Eric Njanga',
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
