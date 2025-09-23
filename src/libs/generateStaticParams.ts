// src/libs/generateStaticParams.ts
import { fetchEntriesDirect } from '@/libs/fetchEntries';

/**
 * Utility to generate static params for any content model
 */
export async function generateParamsForContent(
  dataFor: 'List of Blog Posts' | 'List of Best Work'
) {
  const entries = await fetchEntriesDirect(dataFor);

  if (!Array.isArray(entries)) {
    console.warn(`generateParamsForContent: unexpected data shape for ${dataFor}`);
    return [];
  }

  return entries.map((entry: { sys: { id: string } }) => ({
    contentId: entry.sys.id,
  }));
}
