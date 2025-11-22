/**
 * Static Site Generation (SSG) Utility functions
 * ----------------------
 */
import { contentfulForServerEntriesFetch } from '../../libs/contentful/contentful-forServerFetchEntries';

/**
 * Utility to generate static params for any content model
 */
export async function getAllContentIds(
  dataFor: 'BlogPost Entry Collection' | 'CaseStudy Entry Collection'
) {
  const entries = await contentfulForServerEntriesFetch(dataFor);

  if (!Array.isArray(entries)) {
    console.warn(`getAllContentIds: unexpected data shape for ${dataFor}`);
    return [];
  }

  return entries.map((entry: { sys: { id: string } }) => ({
    contentId: entry.sys.id,
  }));
}
