const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

export const contentfulDataQuery = async ({
  query,
  variables,
  trackingInfo,
}: {
  query: string;
  variables?: Record<string, any>;
  trackingInfo: string;
}) => { 

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    let details = '';
    try {
      const payload = await res.json();
      if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
        details = ` - ${payload.errors.map((error: { message?: string }) => error?.message || 'Unknown GraphQL error').join(' | ')}`;
      }
    } catch {
      // Ignore payload parsing errors and keep the fallback status text.
    }

    throw new Error(`Contentful fetch failed (${trackingInfo}): ${res.status} ${res.statusText}${details}`);
  }

  const { data, errors } = await res.json();

  if (Array.isArray(errors) && errors.length > 0) {
    throw new Error(`Contentful fetch failed (${trackingInfo}): ${errors.map((error: { message?: string }) => error?.message || 'Unknown GraphQL error').join(' | ')}`);
  }

  return data;
};
