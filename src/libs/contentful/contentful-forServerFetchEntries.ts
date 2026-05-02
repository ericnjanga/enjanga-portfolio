// src/libs/contentful-forServerFetchEntries.ts
import { normalizeContentfulResponse } from './contentful-contentNormalizer';
import { getContentfulQueryConfig } from './contentful-queryConfig';
import { contentfulDataQuery } from './contentful-dataQuery';
import type { DataFor1, DataFor2, DataFor3, DataFor4, DataFor5 } from '../../utils/dataProcessing/types';



/**
 * Direct server-side fetch to Contentful GraphQL API.
 * Can be used in generateStaticPar***() or getStaticProps().
 */
export async function contentfulForServerEntriesFetch(
  dataFor: DataFor1 | DataFor2 | DataFor3 | DataFor4 | DataFor5,
  contentId?: string
) {
  if (dataFor === 'CaseStudy Entry' || dataFor === 'CaseStudy Entry Collection') {
    // Temporarily disabled: model removed from Contentful.
    return [];
  }

  const { query, variables, trackingInfo } = getContentfulQueryConfig(dataFor, contentId);
  const data = await contentfulDataQuery({ query, variables, trackingInfo });
  
  return normalizeContentfulResponse(data);
}
