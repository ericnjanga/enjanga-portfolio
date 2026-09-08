/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "fragment CaseStudiesPageIntroFields on CaseStudiesPage {\n  sys {\n    id\n  }\n  slug\n  seoTitle\n  seoDescription\n}": typeof types.CaseStudiesPageIntroFieldsFragmentDoc,
    "fragment ContentSectionFields on ContentSection {\n  sys {\n    id\n  }\n  title\n  body {\n    json\n  }\n  image {\n    ...ImageFields\n  }\n  imageAltText\n  imagePosition\n  cta {\n    __typename\n    ...LinkFields\n  }\n}": typeof types.ContentSectionFieldsFragmentDoc,
    "fragment expertiseCollectionItems on ExpertiseItem {\n  __typename\n  sys {\n    id\n  }\n  title\n  description\n}": typeof types.ExpertiseCollectionItemsFragmentDoc,
    "fragment ExpertiseSectionFields on ExpertiseSection {\n  sys {\n    id\n  }\n  title\n  expertiseItemsCollection(limit: 10) {\n    items {\n      ...expertiseCollectionItems\n    }\n  }\n  image {\n    ...ImageFields\n  }\n  imageAltText\n  cta {\n    __typename\n    ...LinkFields\n  }\n}": typeof types.ExpertiseSectionFieldsFragmentDoc,
    "fragment HeroFields on Hero {\n  sys {\n    id\n  }\n  title\n  subtitle\n}": typeof types.HeroFieldsFragmentDoc,
    "fragment HomePageIntroFields on HomePage {\n  sys {\n    id\n  }\n  slug\n  seoTitle\n  seoDescription\n}": typeof types.HomePageIntroFieldsFragmentDoc,
    "fragment ImageFields on Asset {\n  url\n  width\n  height\n  description\n}": typeof types.ImageFieldsFragmentDoc,
    "fragment LinkFields on Link {\n  __typename\n  sys {\n    id\n  }\n  label\n  linkType\n  externalUrl\n  openInNewTab\n  accessibleLabel\n  internalDestination {\n    __typename\n    ... on HomePage {\n      sys {\n        id\n      }\n      slug\n    }\n    ... on CaseStudiesPage {\n      sys {\n        id\n      }\n      slug\n    }\n  }\n}": typeof types.LinkFieldsFragmentDoc,
    "fragment NavigationFields on Navigation {\n  __typename\n  sys {\n    id\n  }\n  name\n  location\n  itemsCollection(limit: 20) {\n    items {\n      __typename\n      ...NavigationItemFields\n    }\n  }\n}": typeof types.NavigationFieldsFragmentDoc,
    "fragment NavigationItemFields on NavigationItem {\n  __typename\n  sys {\n    id\n  }\n  name\n  destinationType\n  path\n  sectionId\n  openInNewTab\n  isVisible\n}": typeof types.NavigationItemFieldsFragmentDoc,
    "query CaseStudies($skip: Int!, $limit: Int!) {\n  blogPostCollection(\n    skip: $skip\n    limit: $limit\n    order: [sys_firstPublishedAt_DESC, sys_id_ASC]\n  ) {\n    total\n    items {\n      sys {\n        id\n      }\n      title\n      slug\n      blurb\n      introVideo {\n        url\n        contentType\n      }\n      introVideoImage {\n        ...ImageFields\n      }\n    }\n  }\n}\n\nquery CaseStudy($slug: String!) {\n  blogPostCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      sys {\n        id\n      }\n      title\n      slug\n      blurb\n      description {\n        json\n        links {\n          assets {\n            block {\n              sys {\n                id\n              }\n              title\n              ...ImageFields\n            }\n          }\n          entries {\n            hyperlink {\n              sys {\n                id\n              }\n              __typename\n              ... on BlogPost {\n                slug\n              }\n            }\n            inline {\n              sys {\n                id\n              }\n              __typename\n              ... on BlogPost {\n                slug\n              }\n            }\n          }\n        }\n      }\n      introVideo {\n        url\n        contentType\n      }\n      introVideoImage {\n        ...ImageFields\n      }\n    }\n  }\n}": typeof types.CaseStudiesDocument,
    "query CaseStudiesPage($slug: String!) {\n  caseStudiesPageCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      ...CaseStudiesPageIntroFields\n      hero {\n        __typename\n        ...HeroFields\n      }\n    }\n  }\n}": typeof types.CaseStudiesPageDocument,
    "query HomePage($slug: String!) {\n  homePageCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      ...HomePageIntroFields\n      hero {\n        __typename\n        ...HeroFields\n      }\n      expertiseSection {\n        __typename\n        ...ExpertiseSectionFields\n      }\n      aboutSection {\n        __typename\n        ...ContentSectionFields\n      }\n    }\n  }\n}": typeof types.HomePageDocument,
    "query SiteSettings {\n  siteSettingsCollection(limit: 1) {\n    items {\n      sys {\n        id\n      }\n      siteName\n      primaryNavigation {\n        __typename\n        ...NavigationFields\n      }\n      footerLinksCollection(limit: 10) {\n        items {\n          __typename\n          ...LinkFields\n        }\n      }\n      copyrightText\n      location\n    }\n  }\n}": typeof types.SiteSettingsDocument,
};
const documents: Documents = {
    "fragment CaseStudiesPageIntroFields on CaseStudiesPage {\n  sys {\n    id\n  }\n  slug\n  seoTitle\n  seoDescription\n}": types.CaseStudiesPageIntroFieldsFragmentDoc,
    "fragment ContentSectionFields on ContentSection {\n  sys {\n    id\n  }\n  title\n  body {\n    json\n  }\n  image {\n    ...ImageFields\n  }\n  imageAltText\n  imagePosition\n  cta {\n    __typename\n    ...LinkFields\n  }\n}": types.ContentSectionFieldsFragmentDoc,
    "fragment expertiseCollectionItems on ExpertiseItem {\n  __typename\n  sys {\n    id\n  }\n  title\n  description\n}": types.ExpertiseCollectionItemsFragmentDoc,
    "fragment ExpertiseSectionFields on ExpertiseSection {\n  sys {\n    id\n  }\n  title\n  expertiseItemsCollection(limit: 10) {\n    items {\n      ...expertiseCollectionItems\n    }\n  }\n  image {\n    ...ImageFields\n  }\n  imageAltText\n  cta {\n    __typename\n    ...LinkFields\n  }\n}": types.ExpertiseSectionFieldsFragmentDoc,
    "fragment HeroFields on Hero {\n  sys {\n    id\n  }\n  title\n  subtitle\n}": types.HeroFieldsFragmentDoc,
    "fragment HomePageIntroFields on HomePage {\n  sys {\n    id\n  }\n  slug\n  seoTitle\n  seoDescription\n}": types.HomePageIntroFieldsFragmentDoc,
    "fragment ImageFields on Asset {\n  url\n  width\n  height\n  description\n}": types.ImageFieldsFragmentDoc,
    "fragment LinkFields on Link {\n  __typename\n  sys {\n    id\n  }\n  label\n  linkType\n  externalUrl\n  openInNewTab\n  accessibleLabel\n  internalDestination {\n    __typename\n    ... on HomePage {\n      sys {\n        id\n      }\n      slug\n    }\n    ... on CaseStudiesPage {\n      sys {\n        id\n      }\n      slug\n    }\n  }\n}": types.LinkFieldsFragmentDoc,
    "fragment NavigationFields on Navigation {\n  __typename\n  sys {\n    id\n  }\n  name\n  location\n  itemsCollection(limit: 20) {\n    items {\n      __typename\n      ...NavigationItemFields\n    }\n  }\n}": types.NavigationFieldsFragmentDoc,
    "fragment NavigationItemFields on NavigationItem {\n  __typename\n  sys {\n    id\n  }\n  name\n  destinationType\n  path\n  sectionId\n  openInNewTab\n  isVisible\n}": types.NavigationItemFieldsFragmentDoc,
    "query CaseStudies($skip: Int!, $limit: Int!) {\n  blogPostCollection(\n    skip: $skip\n    limit: $limit\n    order: [sys_firstPublishedAt_DESC, sys_id_ASC]\n  ) {\n    total\n    items {\n      sys {\n        id\n      }\n      title\n      slug\n      blurb\n      introVideo {\n        url\n        contentType\n      }\n      introVideoImage {\n        ...ImageFields\n      }\n    }\n  }\n}\n\nquery CaseStudy($slug: String!) {\n  blogPostCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      sys {\n        id\n      }\n      title\n      slug\n      blurb\n      description {\n        json\n        links {\n          assets {\n            block {\n              sys {\n                id\n              }\n              title\n              ...ImageFields\n            }\n          }\n          entries {\n            hyperlink {\n              sys {\n                id\n              }\n              __typename\n              ... on BlogPost {\n                slug\n              }\n            }\n            inline {\n              sys {\n                id\n              }\n              __typename\n              ... on BlogPost {\n                slug\n              }\n            }\n          }\n        }\n      }\n      introVideo {\n        url\n        contentType\n      }\n      introVideoImage {\n        ...ImageFields\n      }\n    }\n  }\n}": types.CaseStudiesDocument,
    "query CaseStudiesPage($slug: String!) {\n  caseStudiesPageCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      ...CaseStudiesPageIntroFields\n      hero {\n        __typename\n        ...HeroFields\n      }\n    }\n  }\n}": types.CaseStudiesPageDocument,
    "query HomePage($slug: String!) {\n  homePageCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      ...HomePageIntroFields\n      hero {\n        __typename\n        ...HeroFields\n      }\n      expertiseSection {\n        __typename\n        ...ExpertiseSectionFields\n      }\n      aboutSection {\n        __typename\n        ...ContentSectionFields\n      }\n    }\n  }\n}": types.HomePageDocument,
    "query SiteSettings {\n  siteSettingsCollection(limit: 1) {\n    items {\n      sys {\n        id\n      }\n      siteName\n      primaryNavigation {\n        __typename\n        ...NavigationFields\n      }\n      footerLinksCollection(limit: 10) {\n        items {\n          __typename\n          ...LinkFields\n        }\n      }\n      copyrightText\n      location\n    }\n  }\n}": types.SiteSettingsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment CaseStudiesPageIntroFields on CaseStudiesPage {\n  sys {\n    id\n  }\n  slug\n  seoTitle\n  seoDescription\n}"): typeof import('./graphql').CaseStudiesPageIntroFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ContentSectionFields on ContentSection {\n  sys {\n    id\n  }\n  title\n  body {\n    json\n  }\n  image {\n    ...ImageFields\n  }\n  imageAltText\n  imagePosition\n  cta {\n    __typename\n    ...LinkFields\n  }\n}"): typeof import('./graphql').ContentSectionFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment expertiseCollectionItems on ExpertiseItem {\n  __typename\n  sys {\n    id\n  }\n  title\n  description\n}"): typeof import('./graphql').ExpertiseCollectionItemsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ExpertiseSectionFields on ExpertiseSection {\n  sys {\n    id\n  }\n  title\n  expertiseItemsCollection(limit: 10) {\n    items {\n      ...expertiseCollectionItems\n    }\n  }\n  image {\n    ...ImageFields\n  }\n  imageAltText\n  cta {\n    __typename\n    ...LinkFields\n  }\n}"): typeof import('./graphql').ExpertiseSectionFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment HeroFields on Hero {\n  sys {\n    id\n  }\n  title\n  subtitle\n}"): typeof import('./graphql').HeroFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment HomePageIntroFields on HomePage {\n  sys {\n    id\n  }\n  slug\n  seoTitle\n  seoDescription\n}"): typeof import('./graphql').HomePageIntroFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment ImageFields on Asset {\n  url\n  width\n  height\n  description\n}"): typeof import('./graphql').ImageFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment LinkFields on Link {\n  __typename\n  sys {\n    id\n  }\n  label\n  linkType\n  externalUrl\n  openInNewTab\n  accessibleLabel\n  internalDestination {\n    __typename\n    ... on HomePage {\n      sys {\n        id\n      }\n      slug\n    }\n    ... on CaseStudiesPage {\n      sys {\n        id\n      }\n      slug\n    }\n  }\n}"): typeof import('./graphql').LinkFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment NavigationFields on Navigation {\n  __typename\n  sys {\n    id\n  }\n  name\n  location\n  itemsCollection(limit: 20) {\n    items {\n      __typename\n      ...NavigationItemFields\n    }\n  }\n}"): typeof import('./graphql').NavigationFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment NavigationItemFields on NavigationItem {\n  __typename\n  sys {\n    id\n  }\n  name\n  destinationType\n  path\n  sectionId\n  openInNewTab\n  isVisible\n}"): typeof import('./graphql').NavigationItemFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CaseStudies($skip: Int!, $limit: Int!) {\n  blogPostCollection(\n    skip: $skip\n    limit: $limit\n    order: [sys_firstPublishedAt_DESC, sys_id_ASC]\n  ) {\n    total\n    items {\n      sys {\n        id\n      }\n      title\n      slug\n      blurb\n      introVideo {\n        url\n        contentType\n      }\n      introVideoImage {\n        ...ImageFields\n      }\n    }\n  }\n}\n\nquery CaseStudy($slug: String!) {\n  blogPostCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      sys {\n        id\n      }\n      title\n      slug\n      blurb\n      description {\n        json\n        links {\n          assets {\n            block {\n              sys {\n                id\n              }\n              title\n              ...ImageFields\n            }\n          }\n          entries {\n            hyperlink {\n              sys {\n                id\n              }\n              __typename\n              ... on BlogPost {\n                slug\n              }\n            }\n            inline {\n              sys {\n                id\n              }\n              __typename\n              ... on BlogPost {\n                slug\n              }\n            }\n          }\n        }\n      }\n      introVideo {\n        url\n        contentType\n      }\n      introVideoImage {\n        ...ImageFields\n      }\n    }\n  }\n}"): typeof import('./graphql').CaseStudiesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CaseStudiesPage($slug: String!) {\n  caseStudiesPageCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      ...CaseStudiesPageIntroFields\n      hero {\n        __typename\n        ...HeroFields\n      }\n    }\n  }\n}"): typeof import('./graphql').CaseStudiesPageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query HomePage($slug: String!) {\n  homePageCollection(where: {slug: $slug}, limit: 1) {\n    items {\n      ...HomePageIntroFields\n      hero {\n        __typename\n        ...HeroFields\n      }\n      expertiseSection {\n        __typename\n        ...ExpertiseSectionFields\n      }\n      aboutSection {\n        __typename\n        ...ContentSectionFields\n      }\n    }\n  }\n}"): typeof import('./graphql').HomePageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SiteSettings {\n  siteSettingsCollection(limit: 1) {\n    items {\n      sys {\n        id\n      }\n      siteName\n      primaryNavigation {\n        __typename\n        ...NavigationFields\n      }\n      footerLinksCollection(limit: 10) {\n        items {\n          __typename\n          ...LinkFields\n        }\n      }\n      copyrightText\n      location\n    }\n  }\n}"): typeof import('./graphql').SiteSettingsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
