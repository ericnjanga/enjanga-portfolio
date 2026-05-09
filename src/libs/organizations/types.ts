import type { Node } from '@contentful/rich-text-types';

export type Organization = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
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
  pictogramName?: string;
  website?: string;
  projects?: { sys: { id: string } }[];
};

export type OrganizationCollection = Organization[];
