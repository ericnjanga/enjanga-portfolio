// src/libs/contentful-forServerFetchEntries.ts
import { normalizeContentfulResponse } from './contentful-contentNormalizer';
import { getContentfulQueryConfig, DataFor } from './contentful-queryConfig';



/**
 * Direct server-side fetch to Contentful GraphQL API.
 * Can be used in generateStaticParams() or getStaticProps().
 */
export async function contentfulForServerEntriesFetch(
  dataFor: DataFor,
  contentId?: string
) {
  const { query, variables } = getContentfulQueryConfig(dataFor, contentId);

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

  return normalizeContentfulResponse(data);
}
