import type { Node } from '@contentful/rich-text-types';

export type Organization = {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: { json: { content: Node[] } };
  pictogramName?: string;
  website?: string;
  projects?: { sys: { id: string } }[];
};

export type OrganizationCollection = Organization[];
