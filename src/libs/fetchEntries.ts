// src/libs/fetchEntries.ts
import { queryData } from './CMS-content-queries';
import { cmsContentIds } from './CMS-references';

/**
 * DataFor
 * ------------------------------------------------------------------
 * A strongly-typed union of all supported content models
 * that can be requested from Contentful.
 *
 * This ensures type safety throughout the app: only these
 * values can be passed to `getQueryConfig()` or `fetchEntriesDirect()`.
 *
 * Example:
 *   const posts = await fetchEntriesDirect("List of Blog Posts");
 */
export type DataFor =
  | 'Landing Page Banner'
  | 'Blog Page Banner'
  | 'Footer Copyright'
  | 'Single Work'
  | 'Single Blog Post'
  | 'InfoBlock by parentId'
  | 'List of Best Work'
  | 'List of quotes'
  | 'List of Scope of expertise'
  | 'List of Blog Posts'
  | 'List of About Info'
  | 'List of Footer Links';



/**
 * getQueryConfig()
 * ------------------------------------------------------------------
 * Returns the appropriate GraphQL query, variables, and tracking info
 * for a given content type (`dataFor`) and optional `contentId`.
 *
 * This function centralizes all query/variable logic so that
 * both client-side (ContentfulFetcher) and server-side utilities
 * (like `fetchEntriesDirect` and `generateStaticParams`) can reuse
 * the same configuration without duplicating switch statements.
 *
 * @param dataFor   One of the supported `DataFor` values
 * @param contentId Optional Contentful entry ID, required for single-entry queries
 * @returns         An object with `{ query, variables, trackingInfo }`
 *
 * Example:
 *   const { query, variables } = getQueryConfig("Single Blog Post", "abc123");
 */
export function getQueryConfig(dataFor: DataFor, contentId?: string) {
  let query = '';
  let variables: Record<string, any> = {
    locale1: 'en-CA',
    locale2: 'fr',
    sectionId: '',
    parentRefId: '',
  };
  let trackingInfo = '';

  switch (dataFor) {
    case 'Landing Page Banner':
      trackingInfo = 'Landing Page Banner';
      query = queryData.infoBlockById;
      variables.sectionId = cmsContentIds.categories['Landing Page Banner'];
      break;

    case 'Blog Page Banner':
      trackingInfo = 'Blog Page Banner';
      query = queryData.infoBlockById;
      variables.sectionId = cmsContentIds.categories['Blog Page Banner'];
      break;

    case 'Footer Copyright':
      trackingInfo = 'Footer Copyright';
      query = queryData.infoBlockById;
      variables.sectionId = cmsContentIds.categories['Footer Copyright'];
      break;

    case 'Single Work':
      trackingInfo = 'Single Work';
      query = queryData.projectById;
      variables.sectionId = contentId ?? '';
      break;

    case 'Single Blog Post':
      trackingInfo = 'Single Blog Post';
      query = queryData.blogPostById;
      variables.sectionId = contentId ?? '';
      break;

    case 'InfoBlock by parentId':
      trackingInfo = 'InfoBlock by parentId';
      query = queryData.infoBlockByParentCollection;
      variables.parentRefId = contentId ?? '';
      break;

    case 'List of Best Work':
      trackingInfo = 'List of Best Work';
      query = queryData.projectsCollection;
      break;

    case 'List of quotes':
      trackingInfo = 'List of quotes';
      query = queryData.quotesCollection;
      break;

    case 'List of Scope of expertise':
      trackingInfo = 'List of Scope of expertise';
      query = queryData.infoBlockByParentCollection;
      variables.parentRefId = cmsContentIds.categories['Scope of expertise'];
      break;

    case 'List of About Info':
      trackingInfo = 'List of About Info';
      query = queryData.infoBlockByParentCollection;
      variables.parentRefId = cmsContentIds.categories['About section'];
      break;

    case 'List of Footer Links':
      trackingInfo = 'List of Footer Links';
      query = queryData.infoBlockByParentCollection;
      variables.parentRefId = cmsContentIds.categories['Footer section'];
      break;

    case 'List of Blog Posts':
      trackingInfo = 'List of Blog Posts';
      query = queryData.blogPostCollection;
      break;
  }

  return { query, variables, trackingInfo };
}



/**
 * Direct server-side fetch to Contentful GraphQL API.
 * Can be used in generateStaticParams() or getStaticProps().
 */
export async function fetchEntriesDirect(
  dataFor: DataFor,
  contentId?: string
) {
  const { query, variables } = getQueryConfig(dataFor, contentId);

  const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
  const endpoint = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Contentful fetch failed: ${res.statusText}`);
  }

  const { data } = await res.json();

  // Normalize return shape so it's always an array
  return (
    // data?.blogPostCollection?.items ??
    // data?.projectsCollection?.items ??
    // data?.infoBlockByParentCollection?.items ??
    data?.en?.items ??
    (data ? [data] : []) // fallback if it's a single entry
  );
}


