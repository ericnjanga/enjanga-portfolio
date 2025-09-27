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
    throw new Error(`Contentful fetch failed: ${res.statusText}`);
  }

  const { data } = await res.json(); 

  return data;
};
