import type { Node } from '@contentful/rich-text-types';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  organization?: { id: string; title: string; slug: string; pictogramName?: string };
  blurb?: string;
  description?: {
    json: { content: Node[] };
    links?: {
      assets: {
        block: {
          sys: { id: string };
          url: string;
          title: string;
          width: number;
          height: number;
          description?: string;
        }[];
      };
    };
  };
};

export type BlogPostCollection = BlogPost[];
