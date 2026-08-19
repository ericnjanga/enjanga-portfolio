import { siteSettingsQuery } from "../queries";
import type { SiteSettingsResponse } from "../types";


export async function getSiteSettings(): Promise<SiteSettingsResponse> {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environment = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';
  const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;

  if (!spaceId || !environment || !deliveryToken) {
    throw new Error('Contentful environment variables are not set.');
  } 

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${deliveryToken}`,
      },
      body: JSON.stringify({ query: siteSettingsQuery }),

      // Refresh Contentful content at most every 5 minutes (300 seconds)
      next: { revalidate: 300 },
    }
  );

  const result = await response.json();

  if (!response.ok) {
    const details =
      result.errors?.map(({ message }) => message).join(', ') ||
      `HTTP ${response.status}`;

    throw new Error(`Contentful request failed: ${details}`);
  }

  // const data = await response.json();

  console.log('Site settings result:', result);
  return result; //.items[0].fields;
}