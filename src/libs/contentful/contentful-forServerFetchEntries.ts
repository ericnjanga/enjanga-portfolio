// src/libs/contentful-forServerFetchEntries.ts
import { normalizeContentfulResponse } from './contentful-contentNormalizer';
import { getContentfulQueryConfig, DataFor } from './contentful-queryConfig';
import { contentfulDataQuery } from './contentful-dataQuery';



/**
 * Direct server-side fetch to Contentful GraphQL API.
 * Can be used in generateStaticParams() or getStaticProps().
 */
export async function contentfulForServerEntriesFetch(
  dataFor: DataFor,
  contentId?: string
) {
  const { query, variables, trackingInfo } = getContentfulQueryConfig(dataFor, contentId);
  const data = await contentfulDataQuery({ query, variables, trackingInfo });
  
  return normalizeContentfulResponse(data);
}
