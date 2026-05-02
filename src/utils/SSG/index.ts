/**
 * Static Site Generation (SSG) Utility functions
 * ----------------------
 */
import { contentfulForServerEntriesFetch } from '../../libs/contentful/contentful-forServerFetchEntries';

/**
 * Utility to generate static slug params for any content model
 */
export async function getAllContentSlugs(
  dataFor: 'BlogPost Entry Collection'
  // dataFor: 'BlogPost Entry Collection' | 'CaseStudy Entry Collection'
) {
  const entries = await contentfulForServerEntriesFetch(dataFor);

  if (!Array.isArray(entries)) {
    console.warn(`getAllContentSlugs: unexpected data shape for ${dataFor}`);
    return [];
  }

  return entries
    .map((entry: { slug?: string | Record<string, string> }) => {
      const rawSlug = entry.slug;
      if (typeof rawSlug === 'string') {
        return rawSlug;
      }
      if (rawSlug && typeof rawSlug === 'object') {
        return rawSlug['en-CA'] ?? Object.values(rawSlug)[0];
      }
      return undefined;
    })
    .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
    .map((slug) => ({ slug }));
}
