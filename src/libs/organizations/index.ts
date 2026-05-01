import type { OrganizationCollection } from './types';

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const CDA_BASE = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

/**
 * Fetches all entries of content type "organization" from Contentful
 * using the Content Delivery REST API.
 */
export async function fetchOrganizations(): Promise<OrganizationCollection> {
  const url = new URL(`${CDA_BASE}/entries`);
  url.searchParams.set('content_type', 'organization');
  url.searchParams.set(
    'select',
    'sys.id,fields.title,fields.slug,fields.subtitle,fields.description,fields.pictogramName,fields.website,fields.projects'
  );

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch organizations: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  return (json.items ?? []).map((item: any) => ({
    id: item.sys.id as string,
    title: item.fields.title as string,
    slug: item.fields.slug as string,
    subtitle: item.fields.subtitle as string | undefined,
    description: item.fields.description as { json: { content: any[] } } | undefined,
    pictogramName: item.fields.pictogramName as string | undefined,
    website: item.fields.website as string | undefined,
    projects: (item.fields.projects as any[] | undefined)?.map((ref) => ({
      sys: { id: ref.sys.id as string },
    })),
  }));
}
