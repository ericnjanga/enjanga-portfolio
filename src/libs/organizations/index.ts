import type { OrganizationCollection } from './types';
import type { ContentModel1 } from '@utils/dataProcessing/types';

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const CDA_BASE = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

type CdaAsset = {
  sys?: { id?: string };
  fields?: {
    title?: string;
    description?: string;
    file?: {
      url?: string;
      details?: {
        image?: {
          width?: number;
          height?: number;
        };
      };
    };
  };
};

const normalizeAssetUrl = (url?: string): string => {
  if (!url) {
    return '';
  }
  return url.startsWith('//') ? `https:${url}` : url;
};

const buildAssetLinks = (assets: CdaAsset[] | undefined) => {
  return (assets ?? [])
    .map((asset) => {
      const id = asset.sys?.id;
      const url = normalizeAssetUrl(asset.fields?.file?.url);
      if (!id || !url) {
        return null;
      }

      return {
        sys: { id },
        url,
        title: asset.fields?.title ?? '',
        width: asset.fields?.file?.details?.image?.width ?? 0,
        height: asset.fields?.file?.details?.image?.height ?? 0,
        ...(asset.fields?.description
          ? { description: asset.fields.description }
          : {}),
      };
    })
    .filter((asset): asset is NonNullable<typeof asset> => asset !== null);
};

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
  const assetLinks = buildAssetLinks(json.includes?.Asset as CdaAsset[] | undefined);

  return (json.items ?? []).map((item: any) => ({
    id: item.sys.id as string,
    title: item.fields.title as string,
    slug: item.fields.slug as string,
    subtitle: item.fields.subtitle as string | undefined,
    // CDA returns the rich-text document directly (not wrapped in `{ json }`).
    // CMSRichText also expects resolved asset links for embedded media nodes.
    description: item.fields.description
      ? {
          json: item.fields.description as { content: any[] },
          links: {
            assets: {
              block: assetLinks,
            },
          },
        }
      : undefined,
    pictogramName: item.fields.pictogramName as string | undefined,
    website: item.fields.website as string | undefined,
    projects: (item.fields.projects as any[] | undefined)?.map((ref) => ({
      sys: { id: ref.sys.id as string },
    })),
  }));
}

/**
 * Fetches a single organization entry by its slug field.
 * Returns null if no matching organization is found.
 */
export async function fetchOrganizationBySlug(slug: string): Promise<OrganizationCollection[number] | null> {
  const orgs = await fetchOrganizations();
  return orgs.find((org) => org.slug === slug) ?? null;
}

/**
 * Fetches case study entries by ID using the Contentful CDA REST API.
 */
export async function fetchOrganizationProjects(projectIds: string[]): Promise<ContentModel1[]> {
  if (!projectIds.length) {
    return [];
  }

  const url = new URL(`${CDA_BASE}/entries`);
  url.searchParams.set('content_type', 'blogPost');
  url.searchParams.set('sys.id[in]', projectIds.join(','));
  url.searchParams.set('select', 'sys.id,fields.slug,fields.title,fields.blurb,fields.description');
  url.searchParams.set('include', '1');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch organization projects: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const items = json.items ?? [];
  const assetLinks = buildAssetLinks(json.includes?.Asset as CdaAsset[] | undefined);

  const byId = new Map<string, ContentModel1>(
    items.map((item: any) => [
      item.sys.id as string,
      {
        sys: {
          id: item.sys.id as string,
        },
          slug: item.fields.slug as string | undefined,
        title: item.fields.title as string | undefined,
        blurb: item.fields.blurb as string | undefined,
        description: item.fields.description
          ? {
              json: item.fields.description as { content: any[] },
              links: {
                assets: {
                  block: assetLinks,
                },
              },
            }
          : undefined,
      },
    ])
  );

  return projectIds.map((id) => byId.get(id)).filter((item): item is ContentModel1 => !!item);
}
