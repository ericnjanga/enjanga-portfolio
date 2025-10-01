// src/libs/generateStaticParams.ts
import { contentfulForServerEntriesFetch } from './contentful/contentful-forServerFetchEntries';

/**
 * Utility to generate static params for any content model
 */
export async function generateParamsForContent(
  dataFor: 'Blog Post Collection' | 'Case Study Collection'
) {
  const entries = await contentfulForServerEntriesFetch(dataFor);

  if (!Array.isArray(entries)) {
    console.warn(`generateParamsForContent: unexpected data shape for ${dataFor}`);
    return [];
  }

  return entries.map((entry: { sys: { id: string } }) => ({
    contentId: entry.sys.id,
  }));
}
