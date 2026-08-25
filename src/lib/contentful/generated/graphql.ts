/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type CaseStudiesPageIntroFieldsFragment = { slug: string | null, seoTitle: string | null, seoDescription: string | null, sys: { id: string } };

export type ContentSectionFieldsFragment = { title: string | null, imageAltText: string | null, imagePosition: string | null, sys: { id: string }, body: { json: unknown } | null, image: { url: string | null, width: number | null, height: number | null, description: string | null } | null, cta: { __typename: 'Link', label: string | null, linkType: string | null, externalUrl: string | null, openInNewTab: boolean | null, accessibleLabel: string | null, sys: { id: string }, internalDestination:
      | { __typename: 'CaseStudiesPage', slug: string | null, sys: { id: string } }
      | { __typename: 'HomePage', slug: string | null, sys: { id: string } }
     | null } | null };

export type ExpertiseCollectionItemsFragment = { title: string | null, description: string | null, sys: { id: string } };

export type ExpertiseSectionFieldsFragment = { title: string | null, imageAltText: string | null, sys: { id: string }, expertiseItemsCollection: { items: Array<{ __typename: 'ExpertiseItem', title: string | null, description: string | null, sys: { id: string } } | null> } | null, image: { url: string | null, width: number | null, height: number | null, description: string | null } | null, cta: { __typename: 'Link', label: string | null, linkType: string | null, externalUrl: string | null, openInNewTab: boolean | null, accessibleLabel: string | null, sys: { id: string }, internalDestination:
      | { __typename: 'CaseStudiesPage', slug: string | null, sys: { id: string } }
      | { __typename: 'HomePage', slug: string | null, sys: { id: string } }
     | null } | null };

export type HeroFieldsFragment = { title: string | null, subtitle: string | null, sys: { id: string } };

export type HomePageIntroFieldsFragment = { slug: string | null, seoTitle: string | null, seoDescription: string | null, sys: { id: string } };

export type ImageFieldsFragment = { url: string | null, width: number | null, height: number | null, description: string | null };

export type LinkFieldsFragment = { __typename: 'Link', label: string | null, linkType: string | null, externalUrl: string | null, openInNewTab: boolean | null, accessibleLabel: string | null, sys: { id: string }, internalDestination:
    | { __typename: 'CaseStudiesPage', slug: string | null, sys: { id: string } }
    | { __typename: 'HomePage', slug: string | null, sys: { id: string } }
   | null };

export type NavigationFieldsFragment = { __typename: 'Navigation', name: string | null, location: string | null, sys: { id: string }, itemsCollection: { items: Array<{ __typename: 'NavigationItem', name: string | null, destinationType: string | null, path: string | null, sectionId: string | null, openInNewTab: boolean | null, isVisible: boolean | null, sys: { id: string } } | null> } | null };

export type NavigationItemFieldsFragment = { __typename: 'NavigationItem', name: string | null, destinationType: string | null, path: string | null, sectionId: string | null, openInNewTab: boolean | null, isVisible: boolean | null, sys: { id: string } };

export type CaseStudiesPageQueryVariables = Exact<{
  slug: string;
}>;


export type CaseStudiesPageQuery = { caseStudiesPageCollection: { items: Array<{ slug: string | null, seoTitle: string | null, seoDescription: string | null, hero: { __typename: 'Hero', title: string | null, subtitle: string | null, sys: { id: string } } | null, sys: { id: string } } | null> } | null };

export type HomePageQueryVariables = Exact<{
  slug: string;
}>;


export type HomePageQuery = { homePageCollection: { items: Array<{ slug: string | null, seoTitle: string | null, seoDescription: string | null, hero: { __typename: 'Hero', title: string | null, subtitle: string | null, sys: { id: string } } | null, expertiseSection: { __typename: 'ExpertiseSection', title: string | null, imageAltText: string | null, sys: { id: string }, expertiseItemsCollection: { items: Array<{ __typename: 'ExpertiseItem', title: string | null, description: string | null, sys: { id: string } } | null> } | null, image: { url: string | null, width: number | null, height: number | null, description: string | null } | null, cta: { __typename: 'Link', label: string | null, linkType: string | null, externalUrl: string | null, openInNewTab: boolean | null, accessibleLabel: string | null, sys: { id: string }, internalDestination:
            | { __typename: 'CaseStudiesPage', slug: string | null, sys: { id: string } }
            | { __typename: 'HomePage', slug: string | null, sys: { id: string } }
           | null } | null } | null, aboutSection: { __typename: 'ContentSection', title: string | null, imageAltText: string | null, imagePosition: string | null, sys: { id: string }, body: { json: unknown } | null, image: { url: string | null, width: number | null, height: number | null, description: string | null } | null, cta: { __typename: 'Link', label: string | null, linkType: string | null, externalUrl: string | null, openInNewTab: boolean | null, accessibleLabel: string | null, sys: { id: string }, internalDestination:
            | { __typename: 'CaseStudiesPage', slug: string | null, sys: { id: string } }
            | { __typename: 'HomePage', slug: string | null, sys: { id: string } }
           | null } | null } | null, sys: { id: string } } | null> } | null };

export type SiteSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteSettingsQuery = { siteSettingsCollection: { items: Array<{ siteName: string | null, copyrightText: string | null, location: string | null, sys: { id: string }, primaryNavigation: { __typename: 'Navigation', name: string | null, location: string | null, sys: { id: string }, itemsCollection: { items: Array<{ __typename: 'NavigationItem', name: string | null, destinationType: string | null, path: string | null, sectionId: string | null, openInNewTab: boolean | null, isVisible: boolean | null, sys: { id: string } } | null> } | null } | null, footerLinksCollection: { items: Array<{ __typename: 'Link', label: string | null, linkType: string | null, externalUrl: string | null, openInNewTab: boolean | null, accessibleLabel: string | null, sys: { id: string }, internalDestination:
            | { __typename: 'CaseStudiesPage', slug: string | null, sys: { id: string } }
            | { __typename: 'HomePage', slug: string | null, sys: { id: string } }
           | null } | null> } | null } | null> } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}
export const CaseStudiesPageIntroFieldsFragmentDoc = new TypedDocumentString(`
    fragment CaseStudiesPageIntroFields on CaseStudiesPage {
  sys {
    id
  }
  slug
  seoTitle
  seoDescription
}
    `, {"fragmentName":"CaseStudiesPageIntroFields"}) as unknown as TypedDocumentString<CaseStudiesPageIntroFieldsFragment, unknown>;
export const ImageFieldsFragmentDoc = new TypedDocumentString(`
    fragment ImageFields on Asset {
  url
  width
  height
  description
}
    `, {"fragmentName":"ImageFields"}) as unknown as TypedDocumentString<ImageFieldsFragment, unknown>;
export const LinkFieldsFragmentDoc = new TypedDocumentString(`
    fragment LinkFields on Link {
  __typename
  sys {
    id
  }
  label
  linkType
  externalUrl
  openInNewTab
  accessibleLabel
  internalDestination {
    __typename
    ... on HomePage {
      sys {
        id
      }
      slug
    }
    ... on CaseStudiesPage {
      sys {
        id
      }
      slug
    }
  }
}
    `, {"fragmentName":"LinkFields"}) as unknown as TypedDocumentString<LinkFieldsFragment, unknown>;
export const ContentSectionFieldsFragmentDoc = new TypedDocumentString(`
    fragment ContentSectionFields on ContentSection {
  sys {
    id
  }
  title
  body {
    json
  }
  image {
    ...ImageFields
  }
  imageAltText
  imagePosition
  cta {
    __typename
    ...LinkFields
  }
}
    fragment ImageFields on Asset {
  url
  width
  height
  description
}
fragment LinkFields on Link {
  __typename
  sys {
    id
  }
  label
  linkType
  externalUrl
  openInNewTab
  accessibleLabel
  internalDestination {
    __typename
    ... on HomePage {
      sys {
        id
      }
      slug
    }
    ... on CaseStudiesPage {
      sys {
        id
      }
      slug
    }
  }
}`, {"fragmentName":"ContentSectionFields"}) as unknown as TypedDocumentString<ContentSectionFieldsFragment, unknown>;
export const ExpertiseCollectionItemsFragmentDoc = new TypedDocumentString(`
    fragment expertiseCollectionItems on ExpertiseItem {
  sys {
    id
  }
  title
  description
}
    `, {"fragmentName":"expertiseCollectionItems"}) as unknown as TypedDocumentString<ExpertiseCollectionItemsFragment, unknown>;
export const ExpertiseSectionFieldsFragmentDoc = new TypedDocumentString(`
    fragment ExpertiseSectionFields on ExpertiseSection {
  sys {
    id
  }
  title
  expertiseItemsCollection(limit: 10) {
    items {
      __typename
      ...expertiseCollectionItems
    }
  }
  image {
    ...ImageFields
  }
  imageAltText
  cta {
    __typename
    ...LinkFields
  }
}
    fragment expertiseCollectionItems on ExpertiseItem {
  sys {
    id
  }
  title
  description
}
fragment ImageFields on Asset {
  url
  width
  height
  description
}
fragment LinkFields on Link {
  __typename
  sys {
    id
  }
  label
  linkType
  externalUrl
  openInNewTab
  accessibleLabel
  internalDestination {
    __typename
    ... on HomePage {
      sys {
        id
      }
      slug
    }
    ... on CaseStudiesPage {
      sys {
        id
      }
      slug
    }
  }
}`, {"fragmentName":"ExpertiseSectionFields"}) as unknown as TypedDocumentString<ExpertiseSectionFieldsFragment, unknown>;
export const HeroFieldsFragmentDoc = new TypedDocumentString(`
    fragment HeroFields on Hero {
  sys {
    id
  }
  title
  subtitle
}
    `, {"fragmentName":"HeroFields"}) as unknown as TypedDocumentString<HeroFieldsFragment, unknown>;
export const HomePageIntroFieldsFragmentDoc = new TypedDocumentString(`
    fragment HomePageIntroFields on HomePage {
  sys {
    id
  }
  slug
  seoTitle
  seoDescription
}
    `, {"fragmentName":"HomePageIntroFields"}) as unknown as TypedDocumentString<HomePageIntroFieldsFragment, unknown>;
export const NavigationItemFieldsFragmentDoc = new TypedDocumentString(`
    fragment NavigationItemFields on NavigationItem {
  __typename
  sys {
    id
  }
  name
  destinationType
  path
  sectionId
  openInNewTab
  isVisible
}
    `, {"fragmentName":"NavigationItemFields"}) as unknown as TypedDocumentString<NavigationItemFieldsFragment, unknown>;
export const NavigationFieldsFragmentDoc = new TypedDocumentString(`
    fragment NavigationFields on Navigation {
  __typename
  sys {
    id
  }
  name
  location
  itemsCollection(limit: 20) {
    items {
      __typename
      ...NavigationItemFields
    }
  }
}
    fragment NavigationItemFields on NavigationItem {
  __typename
  sys {
    id
  }
  name
  destinationType
  path
  sectionId
  openInNewTab
  isVisible
}`, {"fragmentName":"NavigationFields"}) as unknown as TypedDocumentString<NavigationFieldsFragment, unknown>;
export const CaseStudiesPageDocument = new TypedDocumentString(`
    query CaseStudiesPage($slug: String!) {
  caseStudiesPageCollection(where: {slug: $slug}, limit: 1) {
    items {
      ...CaseStudiesPageIntroFields
      hero {
        __typename
        ...HeroFields
      }
    }
  }
}
    fragment CaseStudiesPageIntroFields on CaseStudiesPage {
  sys {
    id
  }
  slug
  seoTitle
  seoDescription
}
fragment HeroFields on Hero {
  sys {
    id
  }
  title
  subtitle
}`) as unknown as TypedDocumentString<CaseStudiesPageQuery, CaseStudiesPageQueryVariables>;
export const HomePageDocument = new TypedDocumentString(`
    query HomePage($slug: String!) {
  homePageCollection(where: {slug: $slug}, limit: 1) {
    items {
      ...HomePageIntroFields
      hero {
        __typename
        ...HeroFields
      }
      expertiseSection {
        __typename
        ...ExpertiseSectionFields
      }
      aboutSection {
        __typename
        ...ContentSectionFields
      }
    }
  }
}
    fragment ContentSectionFields on ContentSection {
  sys {
    id
  }
  title
  body {
    json
  }
  image {
    ...ImageFields
  }
  imageAltText
  imagePosition
  cta {
    __typename
    ...LinkFields
  }
}
fragment expertiseCollectionItems on ExpertiseItem {
  sys {
    id
  }
  title
  description
}
fragment ExpertiseSectionFields on ExpertiseSection {
  sys {
    id
  }
  title
  expertiseItemsCollection(limit: 10) {
    items {
      __typename
      ...expertiseCollectionItems
    }
  }
  image {
    ...ImageFields
  }
  imageAltText
  cta {
    __typename
    ...LinkFields
  }
}
fragment HeroFields on Hero {
  sys {
    id
  }
  title
  subtitle
}
fragment HomePageIntroFields on HomePage {
  sys {
    id
  }
  slug
  seoTitle
  seoDescription
}
fragment ImageFields on Asset {
  url
  width
  height
  description
}
fragment LinkFields on Link {
  __typename
  sys {
    id
  }
  label
  linkType
  externalUrl
  openInNewTab
  accessibleLabel
  internalDestination {
    __typename
    ... on HomePage {
      sys {
        id
      }
      slug
    }
    ... on CaseStudiesPage {
      sys {
        id
      }
      slug
    }
  }
}`) as unknown as TypedDocumentString<HomePageQuery, HomePageQueryVariables>;
export const SiteSettingsDocument = new TypedDocumentString(`
    query SiteSettings {
  siteSettingsCollection(limit: 1) {
    items {
      sys {
        id
      }
      siteName
      primaryNavigation {
        __typename
        ...NavigationFields
      }
      footerLinksCollection(limit: 10) {
        items {
          __typename
          ...LinkFields
        }
      }
      copyrightText
      location
    }
  }
}
    fragment LinkFields on Link {
  __typename
  sys {
    id
  }
  label
  linkType
  externalUrl
  openInNewTab
  accessibleLabel
  internalDestination {
    __typename
    ... on HomePage {
      sys {
        id
      }
      slug
    }
    ... on CaseStudiesPage {
      sys {
        id
      }
      slug
    }
  }
}
fragment NavigationFields on Navigation {
  __typename
  sys {
    id
  }
  name
  location
  itemsCollection(limit: 20) {
    items {
      __typename
      ...NavigationItemFields
    }
  }
}
fragment NavigationItemFields on NavigationItem {
  __typename
  sys {
    id
  }
  name
  destinationType
  path
  sectionId
  openInNewTab
  isVisible
}`) as unknown as TypedDocumentString<SiteSettingsQuery, SiteSettingsQueryVariables>;