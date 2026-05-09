import type { BlogPost, BlogPostCollection } from './types';

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

type CdaEntry = {
  sys?: {
    id?: string;
    contentType?: {
      sys?: {
        id?: string;
      };
    };
  };
  fields?: {
    slug?: string;
  };
};

type RichTextNode = {
  nodeType?: string;
  data?: {
    target?: {
      sys?: {
        id?: string;
      };
    };
    uri?: string;
  };
  content?: RichTextNode[];
  [key: string]: unknown;
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

const buildEntryHrefMap = (entries: CdaEntry[] | undefined): Map<string, string> => {
  const hrefMap = new Map<string, string>();

  (entries ?? []).forEach((entry) => {
    const id = entry.sys?.id;
    const slug = entry.fields?.slug;
    const contentType = entry.sys?.contentType?.sys?.id;

    if (!id || !slug || !contentType) {
      return;
    }

    if (contentType === 'blogPost' || contentType === 'project' || contentType === 'caseStudy') {
      hrefMap.set(id, `/case-studies/${slug}`);
      return;
    }

    if (contentType === 'organization') {
      hrefMap.set(id, `/experience/${slug}`);
    }
  });

  return hrefMap;
};

const rewriteEntryHyperlinks = <T>(document: T, hrefMap: Map<string, string>): T => {
  const visit = (node: RichTextNode): RichTextNode => {
    const nextNode: RichTextNode = { ...node };

    if (node.nodeType === 'entry-hyperlink') {
      const entryId = node.data?.target?.sys?.id;
      const href = entryId ? hrefMap.get(entryId) : undefined;
      if (href) {
        nextNode.nodeType = 'hyperlink';
        nextNode.data = { uri: href };
      }
    }

    if (Array.isArray(node.content)) {
      nextNode.content = node.content.map((child) => visit(child));
    }

    return nextNode;
  };

  if (!document || typeof document !== 'object') {
    return document;
  }

  return visit(document as RichTextNode) as T;
};

const mapBlogPostsFromCda = (json: any): BlogPostCollection => {
  const assetLinks = buildAssetLinks(json.includes?.Asset as CdaAsset[] | undefined);
  const entryHrefMap = buildEntryHrefMap(json.includes?.Entry as CdaEntry[] | undefined);

  // Build a lookup map of linked Organization entries from the CDA includes.
  const orgMap = new Map<string, { id: string; title: string; slug: string; pictogramName?: string }>();
  (json.includes?.Entry ?? []).forEach((entry: any) => {
    if (entry.sys?.contentType?.sys?.id === 'organization') {
      orgMap.set(entry.sys.id, {
        id: entry.sys.id as string,
        title: entry.fields.title as string,
        slug: entry.fields.slug as string,
        pictogramName: entry.fields.pictogramName as string | undefined,
      });
    }
  });

  return (json.items ?? []).map((item: any): BlogPost => ({
    id: item.sys.id as string,
    title: item.fields.title as string,
    slug: item.fields.slug as string,
    createdAt: item.sys.createdAt as string,
    organization: item.fields.organization
      ? orgMap.get(item.fields.organization.sys.id)
      : undefined,
    blurb: item.fields.blurb as string | undefined,
    // CDA returns the rich-text document directly (not wrapped in `{ json }`).
    // CMSRichText also expects resolved asset links for embedded media nodes.
    description: item.fields.description
      ? {
          json: rewriteEntryHyperlinks(
            item.fields.description as { content: any[] },
            entryHrefMap
          ),
          links: {
            assets: {
              block: assetLinks,
            },
          },
        }
      : undefined,
  }));
};

/**
 * Fetches all entries of content type "blogPost" from Contentful
 * using the Content Delivery REST API.
 */
export async function fetchBlogPosts(): Promise<BlogPostCollection> {
  const url = new URL(`${CDA_BASE}/entries`);
  url.searchParams.set('content_type', 'blogPost');
  url.searchParams.set(
    'select',
    'sys.id,sys.createdAt,fields.title,fields.slug,fields.organization,fields.blurb,fields.description'
  );
  url.searchParams.set('include', '1');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blog posts: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  return mapBlogPostsFromCda(json);
}

/**
 * Fetches a single blog post entry by its slug field.
 * Returns null if no matching blog post is found.
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const url = new URL(`${CDA_BASE}/entries`);
  url.searchParams.set('content_type', 'blogPost');
  url.searchParams.set('fields.slug', slug);
  url.searchParams.set('limit', '1');
  url.searchParams.set(
    'select',
    'sys.id,sys.createdAt,fields.title,fields.slug,fields.organization,fields.blurb,fields.description'
  );
  url.searchParams.set('include', '2');

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch blog post by slug: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const posts = mapBlogPostsFromCda(json);
  return posts[0] ?? null;
}
