import type { Node } from '@contentful/rich-text-types';

export interface InformationBlock {
  sys: {
    id: string;
  };
  parentId?: string;
  order: number;
  icon?: string;
  title: string;
  blurb?: string;
  description?: { json: { content: Node[] } };
}
