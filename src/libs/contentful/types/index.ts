import type { Node } from '@contentful/rich-text-types';

// Information Block proptypes
export interface IB_propsType {
  sys: {
    id: string;
  };
  parentId?: string;
  order: number;
  icon?: string;
  title: string;
  blurb?: string;
  image?: {
    url: string;
    title: string;
    description: string;
  };
  description?: { json: { content: Node[] } };
}
