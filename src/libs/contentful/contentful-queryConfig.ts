
import { queryData } from './GraphQL-query';



// ...
export const contentfulContentIds = {
  categories: {
    'Landing Page Banner': '4llAs4gW4mc1fikxbW6u4V',
    'Blog Page Banner': '1KZzwxEzfTs7rLABpVpjX1',
    'Footer Copyright': '2KSc8hw8VvMNS5rXQP8GEZ',
    'Case Study Collection': ['5y2JSha3mykWdGkUf6XcQp'],
    'Scope of expertise Collection': '5OpXyMfZfJlGQzTKJSn9Hw',
    'About Info Collection': '2yc27jrBHSGwDBau6c8qfA',
    'Featured Image': '2eSLi2IP4sZrrPK0AeQPk7',
    'Footer Links Collection': '2uxFOT0LB1ET4SfM4dNWvo',
  },
};





/**
 * DataFor
 * ------------------------------------------------------------------
 * A strongly-typed union of all supported content models
 * that can be requested from Contentful.
 *
 * This ensures type safety throughout the app: only these
 * values can be passed to `getContentfulQueryConfig()` or `contentfulForServerEntriesFetch()`.
 *
 * Example:
 *   const posts = await contentfulForServerEntriesFetch("Blog Post Collection");
 */
export type DataFor =
  | 'Blog Post Collection'
  | 'About Info Collection'
  | 'Scope of expertise Collection'
  | 'Expertise Entry Collection'
  | 'Blog Post Entry'
  | 'Landing Page Banner'
  | 'Blog Page Banner'
  | 'Footer Copyright'
  | 'Case Study Entry'
  | 'Case Study Collection'
  | 'Quotes Entry Collection'
  | 'Footer Links Collection';




/** 
 * ------------------------------------------------------------------
 * Returns the appropriate GraphQL query, variables, and tracking info
 * for a given content type (`dataFor`) and optional `contentId`.
 *
 * This function centralizes all query/variable logic so that
 * both client-side (ContentfulDataProvider) and server-side utilities
 * (like `contentfulForServerEntriesFetch` and `generateStaticParams`) can reuse
 * the same configuration without duplicating switch statements.
 *
 * @param dataFor   One of the supported `DataFor` values
 * @param contentId Optional Contentful entry ID, required for single-entry queries
 * @returns         An object with `{ query, variables, trackingInfo }`
 *
 * Example:
 *   const { query, variables } = getContentfulQueryConfig("Blog Post Entry", "abc123");
 */
export function getContentfulQueryConfig(dataFor: DataFor, contentId?: string) {
  let query = '';
  let variables: Record<string, any> = {
    locale1: 'en-CA',
    locale2: 'fr',
    sectionId: '',
    parentRefId: '',
  };
  let trackingInfo = dataFor;

  switch (dataFor) { 
    case 'Expertise Entry Collection':
    case 'Scope of expertise Collection':
    case 'About Info Collection':
    case 'Footer Links Collection':
      if (dataFor==='Expertise Entry Collection') {
        const expertiseId = contentId;
        query = queryData.infoBlockByParentCollection;
        variables.parentRefId = expertiseId ?? '';
      } else {
        query = queryData.infoBlockByParentCollection;
        variables.parentRefId = contentfulContentIds.categories[dataFor];
      }
      break;

    case 'Landing Page Banner':
    case 'Blog Page Banner':
    case 'Footer Copyright':
      query = queryData.infoBlockById;
      variables.sectionId = contentfulContentIds.categories[dataFor];
      break;

    case 'Case Study Entry':
      query = queryData.projectById;
      variables.sectionId = contentId ?? '';
      break;

    case 'Blog Post Entry':
      query = queryData.blogPostById;
      variables.sectionId = contentId ?? '';
      break;

    case 'Case Study Collection':
      query = queryData.projectsCollection;
      break;

    case 'Quotes Entry Collection':
      query = queryData.quotesCollection;
      break;

    case 'Blog Post Collection':
      query = queryData.blogPostCollection;
      break;
  }

  return { query, variables, trackingInfo };
}

