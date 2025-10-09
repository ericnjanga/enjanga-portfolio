
import { ReactNode } from 'react';
import type { Node } from '@contentful/rich-text-types';
import { IB_propsType } from '../../types';
import { CQ_quote_propsType } from 'enjanga-components-library';
import { dataFor1 } from '../../contentful-queryConfig';
import { EntryGroup1_propsType } from '../../types';



export interface CDP_propsType {
  dataFor: dataFor1;
  contentId?: string;
  children: (props: EntryGroup1_propsType) => ReactNode;
}
  



// Contentful Data Provider Context propstypes
// export interface CDP_context_propsType {
//   id?: string;
//   title: string;
//   blurb?: string;
//   image?: {
//     url: string;
//     title: string;
//     description: string;
//   };
//   plainDescription?: string;
//   richDescription?: { json: { content: Node[] } };
//   items?: IB_propsType[] | CQ_quote_propsType[];
//   orderedItems?: IB_propsType[] | CQ_quote_propsType[];
// }

// Contentful Data Provider Context propstypes
// export interface CDP_context_propsType {
//   id?: string;
//   title: string;
//   blurb?: string;
//   image?: {
//     url: string;
//     title: string;
//     description: string;
//   };
//   plainDescription?: string;
//   richDescription?: { json: { content: Node[] } };
// }

// // "blockInfo Entry collections"
// export interface CDP_blockInfo_entryColl_context_propsType {
//   items?: IB_propsType[];
//   orderedItems?: IB_propsType[];
// }

// // "Quotes Entry collections"
// export interface CDP_quotes_entryColl_context_propsType {
//   items?: CQ_quote_propsType[];
//   orderedItems?: CQ_quote_propsType[];
// }




// export type CDP_propsType = CDP_quotes_propsType | CDP_blockInfo_propsType;


// // Contentful Data Provider propstypes
// export interface CDP_quotes_propsType {
//   dataFor: DataFor_quotes
//   contentId?: string;
//   children: (props: CQ_quote_propsType[]) => ReactNode;
// }
// export interface CDP_blockInfo_propsType {
//   dataFor: DataFor_blockInfo
//   contentId?: string;
//   children: (props: IB_propsType[]) => ReactNode;
// }