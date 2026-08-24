/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type LinkFieldsFragment = { label: string | null, linkType: string | null, externalUrl: string | null, openInNewTab: boolean | null, accessibleLabel: string | null, sys: { id: string }, internalDestination:
    | { __typename: 'BlogPost' }
    | { __typename: 'CaseStudiesPage', slug: string | null, sys: { id: string } }
    | { __typename: 'Category' }
    | { __typename: 'ContentSection' }
    | { __typename: 'ExpertiseItem' }
    | { __typename: 'ExpertiseSection' }
    | { __typename: 'ExpertiseSpecification' }
    | { __typename: 'Hero' }
    | { __typename: 'HomePage', slug: string | null, sys: { id: string } }
    | { __typename: 'InfoBlock' }
    | { __typename: 'Link' }
    | { __typename: 'Navigation' }
    | { __typename: 'NavigationItem' }
    | { __typename: 'Organization' }
    | { __typename: 'Page' }
    | { __typename: 'Quote' }
    | { __typename: 'Service' }
    | { __typename: 'SiteSettings' }
   | null };

export type CaseStudiesPageQueryVariables = Exact<{
  slug: string;
}>;


export type CaseStudiesPageQuery = { caseStudiesPageCollection: { items: Array<{ slug: string | null, seoTitle: string | null, seoDescription: string | null, sys: { id: string }, hero:
        | { __typename: 'BlogPost' }
        | { __typename: 'CaseStudiesPage' }
        | { __typename: 'Category' }
        | { __typename: 'ContentSection' }
        | { __typename: 'ExpertiseItem' }
        | { __typename: 'ExpertiseSection' }
        | { __typename: 'ExpertiseSpecification' }
        | { __typename: 'Hero', title: string | null, subtitle: string | null, sys: { id: string } }
        | { __typename: 'HomePage' }
        | { __typename: 'InfoBlock' }
        | { __typename: 'Link' }
        | { __typename: 'Navigation' }
        | { __typename: 'NavigationItem' }
        | { __typename: 'Organization' }
        | { __typename: 'Page' }
        | { __typename: 'Quote' }
        | { __typename: 'Service' }
        | { __typename: 'SiteSettings' }
       | null } | null> } | null };

export type HomePageQueryVariables = Exact<{
  slug: string;
}>;


export type HomePageQuery = { homePageCollection: { items: Array<{ slug: string | null, seoTitle: string | null, seoDescription: string | null, sys: { id: string }, hero:
        | { __typename: 'BlogPost' }
        | { __typename: 'CaseStudiesPage' }
        | { __typename: 'Category' }
        | { __typename: 'ContentSection' }
        | { __typename: 'ExpertiseItem' }
        | { __typename: 'ExpertiseSection' }
        | { __typename: 'ExpertiseSpecification' }
        | { __typename: 'Hero', title: string | null, subtitle: string | null, sys: { id: string } }
        | { __typename: 'HomePage' }
        | { __typename: 'InfoBlock' }
        | { __typename: 'Link' }
        | { __typename: 'Navigation' }
        | { __typename: 'NavigationItem' }
        | { __typename: 'Organization' }
        | { __typename: 'Page' }
        | { __typename: 'Quote' }
        | { __typename: 'Service' }
        | { __typename: 'SiteSettings' }
       | null, expertiseSection:
        | { __typename: 'BlogPost' }
        | { __typename: 'CaseStudiesPage' }
        | { __typename: 'Category' }
        | { __typename: 'ContentSection' }
        | { __typename: 'ExpertiseItem' }
        | { __typename: 'ExpertiseSection', title: string | null, imageAltText: string | null, sys: { id: string }, expertiseItemsCollection: { items: Array<
              | { __typename: 'BlogPost' }
              | { __typename: 'CaseStudiesPage' }
              | { __typename: 'Category' }
              | { __typename: 'ContentSection' }
              | { __typename: 'ExpertiseItem', title: string | null, description: string | null, sys: { id: string } }
              | { __typename: 'ExpertiseSection' }
              | { __typename: 'ExpertiseSpecification' }
              | { __typename: 'Hero' }
              | { __typename: 'HomePage' }
              | { __typename: 'InfoBlock' }
              | { __typename: 'Link' }
              | { __typename: 'Navigation' }
              | { __typename: 'NavigationItem' }
              | { __typename: 'Organization' }
              | { __typename: 'Page' }
              | { __typename: 'Quote' }
              | { __typename: 'Service' }
              | { __typename: 'SiteSettings' }
             | null> } | null, image: { url: string | null, width: number | null, height: number | null, description: string | null } | null, cta:
            | { __typename: 'BlogPost' }
            | { __typename: 'CaseStudiesPage' }
            | { __typename: 'Category' }
            | { __typename: 'ContentSection' }
            | { __typename: 'ExpertiseItem' }
            | { __typename: 'ExpertiseSection' }
            | { __typename: 'ExpertiseSpecification' }
            | { __typename: 'Hero' }
            | { __typename: 'HomePage' }
            | { __typename: 'InfoBlock' }
            | { __typename: 'Link', label: string | null, linkType: string | null, externalUrl: string | null, openInNewTab: boolean | null, accessibleLabel: string | null, sys: { id: string }, internalDestination:
                | { __typename: 'BlogPost' }
                | { __typename: 'CaseStudiesPage', slug: string | null, sys: { id: string } }
                | { __typename: 'Category' }
                | { __typename: 'ContentSection' }
                | { __typename: 'ExpertiseItem' }
                | { __typename: 'ExpertiseSection' }
                | { __typename: 'ExpertiseSpecification' }
                | { __typename: 'Hero' }
                | { __typename: 'HomePage', slug: string | null, sys: { id: string } }
                | { __typename: 'InfoBlock' }
                | { __typename: 'Link' }
                | { __typename: 'Navigation' }
                | { __typename: 'NavigationItem' }
                | { __typename: 'Organization' }
                | { __typename: 'Page' }
                | { __typename: 'Quote' }
                | { __typename: 'Service' }
                | { __typename: 'SiteSettings' }
               | null }
            | { __typename: 'Navigation' }
            | { __typename: 'NavigationItem' }
            | { __typename: 'Organization' }
            | { __typename: 'Page' }
            | { __typename: 'Quote' }
            | { __typename: 'Service' }
            | { __typename: 'SiteSettings' }
           | null }
        | { __typename: 'ExpertiseSpecification' }
        | { __typename: 'Hero' }
        | { __typename: 'HomePage' }
        | { __typename: 'InfoBlock' }
        | { __typename: 'Link' }
        | { __typename: 'Navigation' }
        | { __typename: 'NavigationItem' }
        | { __typename: 'Organization' }
        | { __typename: 'Page' }
        | { __typename: 'Quote' }
        | { __typename: 'Service' }
        | { __typename: 'SiteSettings' }
       | null, aboutSection:
        | { __typename: 'BlogPost' }
        | { __typename: 'CaseStudiesPage' }
        | { __typename: 'Category' }
        | { __typename: 'ContentSection', title: string | null, imageAltText: string | null, imagePosition: string | null, sys: { id: string }, body: { json: unknown } | null, image: { url: string | null, width: number | null, height: number | null, description: string | null } | null, cta:
            | { __typename: 'BlogPost' }
            | { __typename: 'CaseStudiesPage' }
            | { __typename: 'Category' }
            | { __typename: 'ContentSection' }
            | { __typename: 'ExpertiseItem' }
            | { __typename: 'ExpertiseSection' }
            | { __typename: 'ExpertiseSpecification' }
            | { __typename: 'Hero' }
            | { __typename: 'HomePage' }
            | { __typename: 'InfoBlock' }
            | { __typename: 'Link', label: string | null, linkType: string | null, externalUrl: string | null, openInNewTab: boolean | null, accessibleLabel: string | null, sys: { id: string }, internalDestination:
                | { __typename: 'BlogPost' }
                | { __typename: 'CaseStudiesPage', slug: string | null, sys: { id: string } }
                | { __typename: 'Category' }
                | { __typename: 'ContentSection' }
                | { __typename: 'ExpertiseItem' }
                | { __typename: 'ExpertiseSection' }
                | { __typename: 'ExpertiseSpecification' }
                | { __typename: 'Hero' }
                | { __typename: 'HomePage', slug: string | null, sys: { id: string } }
                | { __typename: 'InfoBlock' }
                | { __typename: 'Link' }
                | { __typename: 'Navigation' }
                | { __typename: 'NavigationItem' }
                | { __typename: 'Organization' }
                | { __typename: 'Page' }
                | { __typename: 'Quote' }
                | { __typename: 'Service' }
                | { __typename: 'SiteSettings' }
               | null }
            | { __typename: 'Navigation' }
            | { __typename: 'NavigationItem' }
            | { __typename: 'Organization' }
            | { __typename: 'Page' }
            | { __typename: 'Quote' }
            | { __typename: 'Service' }
            | { __typename: 'SiteSettings' }
           | null }
        | { __typename: 'ExpertiseItem' }
        | { __typename: 'ExpertiseSection' }
        | { __typename: 'ExpertiseSpecification' }
        | { __typename: 'Hero' }
        | { __typename: 'HomePage' }
        | { __typename: 'InfoBlock' }
        | { __typename: 'Link' }
        | { __typename: 'Navigation' }
        | { __typename: 'NavigationItem' }
        | { __typename: 'Organization' }
        | { __typename: 'Page' }
        | { __typename: 'Quote' }
        | { __typename: 'Service' }
        | { __typename: 'SiteSettings' }
       | null } | null> } | null };

export type SiteSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type SiteSettingsQuery = { siteSettingsCollection: { items: Array<{ siteName: string | null, copyrightText: string | null, location: string | null, sys: { id: string }, primaryNavigation:
        | { __typename: 'BlogPost' }
        | { __typename: 'CaseStudiesPage' }
        | { __typename: 'Category' }
        | { __typename: 'ContentSection' }
        | { __typename: 'ExpertiseItem' }
        | { __typename: 'ExpertiseSection' }
        | { __typename: 'ExpertiseSpecification' }
        | { __typename: 'Hero' }
        | { __typename: 'HomePage' }
        | { __typename: 'InfoBlock' }
        | { __typename: 'Link' }
        | { __typename: 'Navigation', name: string | null, location: string | null, sys: { id: string }, itemsCollection: { items: Array<
              | { __typename: 'BlogPost', sys: { id: string } }
              | { __typename: 'CaseStudiesPage', sys: { id: string } }
              | { __typename: 'Category', sys: { id: string } }
              | { __typename: 'ContentSection', sys: { id: string } }
              | { __typename: 'ExpertiseItem', sys: { id: string } }
              | { __typename: 'ExpertiseSection', sys: { id: string } }
              | { __typename: 'ExpertiseSpecification', sys: { id: string } }
              | { __typename: 'Hero', sys: { id: string } }
              | { __typename: 'HomePage', sys: { id: string } }
              | { __typename: 'InfoBlock', sys: { id: string } }
              | { __typename: 'Link', sys: { id: string } }
              | { __typename: 'Navigation', sys: { id: string } }
              | { __typename: 'NavigationItem', name: string | null, destinationType: string | null, path: string | null, sectionId: string | null, openInNewTab: boolean | null, isVisible: boolean | null, sys: { id: string } }
              | { __typename: 'Organization', sys: { id: string } }
              | { __typename: 'Page', sys: { id: string } }
              | { __typename: 'Quote', sys: { id: string } }
              | { __typename: 'Service', sys: { id: string } }
              | { __typename: 'SiteSettings', sys: { id: string } }
             | null> } | null }
        | { __typename: 'NavigationItem' }
        | { __typename: 'Organization' }
        | { __typename: 'Page' }
        | { __typename: 'Quote' }
        | { __typename: 'Service' }
        | { __typename: 'SiteSettings' }
       | null, footerLinksCollection: { items: Array<
          | { __typename: 'BlogPost' }
          | { __typename: 'CaseStudiesPage' }
          | { __typename: 'Category' }
          | { __typename: 'ContentSection' }
          | { __typename: 'ExpertiseItem' }
          | { __typename: 'ExpertiseSection' }
          | { __typename: 'ExpertiseSpecification' }
          | { __typename: 'Hero' }
          | { __typename: 'HomePage' }
          | { __typename: 'InfoBlock' }
          | { __typename: 'Link', label: string | null, linkType: string | null, externalUrl: string | null, openInNewTab: boolean | null, accessibleLabel: string | null, sys: { id: string }, internalDestination:
              | { __typename: 'BlogPost' }
              | { __typename: 'CaseStudiesPage', slug: string | null, sys: { id: string } }
              | { __typename: 'Category' }
              | { __typename: 'ContentSection' }
              | { __typename: 'ExpertiseItem' }
              | { __typename: 'ExpertiseSection' }
              | { __typename: 'ExpertiseSpecification' }
              | { __typename: 'Hero' }
              | { __typename: 'HomePage', slug: string | null, sys: { id: string } }
              | { __typename: 'InfoBlock' }
              | { __typename: 'Link' }
              | { __typename: 'Navigation' }
              | { __typename: 'NavigationItem' }
              | { __typename: 'Organization' }
              | { __typename: 'Page' }
              | { __typename: 'Quote' }
              | { __typename: 'Service' }
              | { __typename: 'SiteSettings' }
             | null }
          | { __typename: 'Navigation' }
          | { __typename: 'NavigationItem' }
          | { __typename: 'Organization' }
          | { __typename: 'Page' }
          | { __typename: 'Quote' }
          | { __typename: 'Service' }
          | { __typename: 'SiteSettings' }
         | null> } | null } | null> } | null };

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
export const LinkFieldsFragmentDoc = new TypedDocumentString(`
    fragment LinkFields on Link {
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
export const CaseStudiesPageDocument = new TypedDocumentString(`
    query CaseStudiesPage($slug: String!) {
  caseStudiesPageCollection(where: {slug: $slug}, limit: 1) {
    items {
      sys {
        id
      }
      slug
      seoTitle
      seoDescription
      hero {
        __typename
        ... on Hero {
          sys {
            id
          }
          title
          subtitle
        }
      }
    }
  }
}
    `) as unknown as TypedDocumentString<CaseStudiesPageQuery, CaseStudiesPageQueryVariables>;
export const HomePageDocument = new TypedDocumentString(`
    query HomePage($slug: String!) {
  homePageCollection(where: {slug: $slug}, limit: 1) {
    items {
      sys {
        id
      }
      slug
      seoTitle
      seoDescription
      hero {
        __typename
        ... on Hero {
          sys {
            id
          }
          title
          subtitle
        }
      }
      expertiseSection {
        __typename
        ... on ExpertiseSection {
          sys {
            id
          }
          title
          expertiseItemsCollection(limit: 10) {
            items {
              __typename
              ... on ExpertiseItem {
                sys {
                  id
                }
                title
                description
              }
            }
          }
          image {
            url
            width
            height
            description
          }
          imageAltText
          cta {
            __typename
            ... on Link {
              ...LinkFields
            }
          }
        }
      }
      aboutSection {
        __typename
        ... on ContentSection {
          sys {
            id
          }
          title
          body {
            json
          }
          image {
            url
            width
            height
            description
          }
          imageAltText
          imagePosition
          cta {
            __typename
            ... on Link {
              ...LinkFields
            }
          }
        }
      }
    }
  }
}
    fragment LinkFields on Link {
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
        ... on Navigation {
          sys {
            id
          }
          name
          location
          itemsCollection(limit: 20) {
            items {
              sys {
                id
              }
              __typename
              ... on NavigationItem {
                name
                destinationType
                path
                sectionId
                openInNewTab
                isVisible
              }
            }
          }
        }
      }
      footerLinksCollection(limit: 10) {
        items {
          __typename
          ... on Link {
            ...LinkFields
          }
        }
      }
      copyrightText
      location
    }
  }
}
    fragment LinkFields on Link {
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
}`) as unknown as TypedDocumentString<SiteSettingsQuery, SiteSettingsQueryVariables>;