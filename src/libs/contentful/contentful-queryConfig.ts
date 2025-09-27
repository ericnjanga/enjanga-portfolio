
import { queryData } from './GraphQL-query';



// ...
export const contentfulContentIds = {
  categories: {
    'Landing Page Banner': '4llAs4gW4mc1fikxbW6u4V',
    'Blog Page Banner': '1KZzwxEzfTs7rLABpVpjX1',
    'Footer Copyright': '2KSc8hw8VvMNS5rXQP8GEZ',
    'List of Best Work': ['5y2JSha3mykWdGkUf6XcQp'],
    'Scope of expertise': '5OpXyMfZfJlGQzTKJSn9Hw',
    'About section': '2yc27jrBHSGwDBau6c8qfA',
    'Featured Image': '2eSLi2IP4sZrrPK0AeQPk7',
    'Footer section': '2uxFOT0LB1ET4SfM4dNWvo',
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
  | 'Blog Post Entry'
  | 'About Info Collection'
  
  | 'Landing Page Banner'
  | 'Blog Page Banner'
  | 'Footer Copyright'
  | 'Single Work'
  | 'InfoBlock by parentId'
  | 'List of Best Work'
  | 'List of quotes'
  | 'List of Scope of expertise'
  | 'List of Footer Links';




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
    case 'Landing Page Banner':
      query = queryData.infoBlockById;
      variables.sectionId = contentfulContentIds.categories['Landing Page Banner'];
      break;

    case 'Blog Page Banner':
      query = queryData.infoBlockById;
      variables.sectionId = contentfulContentIds.categories['Blog Page Banner'];
      break;

    case 'Footer Copyright':
      query = queryData.infoBlockById;
      variables.sectionId = contentfulContentIds.categories['Footer Copyright'];
      break;

    case 'Single Work':
      query = queryData.projectById;
      variables.sectionId = contentId ?? '';
      break;

    case 'Blog Post Entry':
      query = queryData.blogPostById;
      variables.sectionId = contentId ?? '';
      break;

    case 'InfoBlock by parentId':
      query = queryData.infoBlockByParentCollection;
      variables.parentRefId = contentId ?? '';
      break;

    case 'List of Best Work':
      query = queryData.projectsCollection;
      break;

    case 'List of quotes':
      query = queryData.quotesCollection;
      break;

    case 'List of Scope of expertise':
      query = queryData.infoBlockByParentCollection;
      variables.parentRefId = contentfulContentIds.categories['Scope of expertise'];
      break;

    case 'About Info Collection':
      query = queryData.infoBlockByParentCollection;
      variables.parentRefId = contentfulContentIds.categories['About section'];
      break;

    case 'List of Footer Links':
      query = queryData.infoBlockByParentCollection;
      variables.parentRefId = contentfulContentIds.categories['Footer section'];
      break;

    case 'Blog Post Collection':
      query = queryData.blogPostCollection;
      break;
  }

  return { query, variables, trackingInfo };
}

