import type { BlogPost, BlogPostCollection } from './types';

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const CDA_BASE = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

/**
 * Fetches all entries of content type "blogPost" from Contentful
 * using the Content Delivery REST API.
 */
export async function fetchBlogPosts(): Promise<BlogPostCollection> {
  const url = new URL(`${CDA_BASE}/entries`);
  url.searchParams.set('content_type', 'blogPost');
  url.searchParams.set(
    'select',
    'sys.id,fields.title,fields.slug,fields.organization,fields.blurb,fields.description'
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
    organization: item.fields.organization
      ? orgMap.get(item.fields.organization.sys.id)
      : undefined,
    blurb: item.fields.blurb as string | undefined,
    // CDA returns the rich-text document directly (not wrapped in `{ json }`).
    // Wrap it here to match the GraphQL shape that CMSRichText expects.
    description: item.fields.description
      ? { json: item.fields.description as { content: any[] } }
      : undefined,
  }));
}

/**
 * Fetches a single blog post entry by its slug field.
 * Returns null if no matching blog post is found.
 */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await fetchBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}
