import type { Node } from '@contentful/rich-text-types';

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  isFeatured?: boolean;
  businessDomain?: string[];
  techstack?: string[];
  introVideo?: {
    url: string;
    contentType?: string;
    fileName?: string;
    size?: number;
    width?: number;
    height?: number;
    title?: string;
    description?: string;
  };
  introVideoImage?: {
    url: string;
    contentType?: string;
    fileName?: string;
    size?: number;
    width?: number;
    height?: number;
    title?: string;
    description?: string;
  };
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
