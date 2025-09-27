
import { ReactNode } from 'react';
import type { Node } from '@contentful/rich-text-types';
import { IB_propsType } from '../../types';
import { CQ_quote_propsType } from 'enjanga-components-library';
import { DataFor } from '../../contentful-queryConfig';

// Contentful Data Provider Context propstypes
export interface CDP_context_propsType {
  id?: string;
  title: string;
  blurb?: string;
  image?: {
    url: string;
    title: string;
    description: string;
  };
  plainDescription?: string;
  richDescription?: { json: { content: Node[] } };
  items?: IB_propsType[];
  orderedItems?: IB_propsType[] | CQ_quote_propsType[];
}



// Contentful Data Provider propstypes
export interface CDP_propsType {
  dataFor: DataFor;
  contentId?: string;
  children: (props: CDP_context_propsType) => ReactNode;
}