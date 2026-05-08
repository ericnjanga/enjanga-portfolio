import type { Node } from '@contentful/rich-text-types';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  organization?: { id: string; title: string; slug: string; pictogramName?: string };
  blurb?: string;
  description?: { json: { content: Node[] } };
};

export type BlogPostCollection = BlogPost[];
