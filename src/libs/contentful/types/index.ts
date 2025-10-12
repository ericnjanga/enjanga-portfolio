import type { Node } from '@contentful/rich-text-types';
import { ReactNode } from 'react';


  



/**
 * DataFor
 * ------------------------------------------------------------------
 * A strongly-typed union of all supported content models
 * that can be requested from Contentful.
 *
 * This ensures type safety throughout the app: only these
 * values can be passed to `getContentfulQueryConfig()` or `contentfulForServerEntriesFetch()`.
 *
 * Example:
 *   const posts = await contentfulForServerEntriesFetch("BlogPost Entry Collection");
 */
export type dataFor1 = 'BannerHomePage Entry' | 'BannerBlogPage Entry' | 'FooterCopyright Entry' | 'CaseStudy Entry';
export type dataFor2 = 'scopeOfExp Parent Entry Collection' | 'scopeOfExp Entry Collection';
export const getDataType = (dataFor: dataFor1 | dataFor2): string => {
  switch(dataFor) {
    case 'BannerHomePage Entry':
    case 'BannerBlogPage Entry':
    case 'FooterCopyright Entry':
    case 'CaseStudy Entry':
      return 'dataFor1';
    
    case 'scopeOfExp Parent Entry Collection':
    case 'scopeOfExp Entry Collection':
      return 'dataFor2';
  }
};




export type DataFor =
  | 'BlogPost Entry Collection'
  | 'AboutInfo Entry Collection'
  | 'scopeOfExp Parent Entry Collection'
  | 'scopeOfExp Entry Collection'
  | 'CaseStudy Entry Collection'
  | 'FooterLinks Entry Collection'
  | 'BlogPost Entry'
  | 'BannerHomePage Entry'
  | 'BannerBlogPage Entry'
  | 'FooterCopyright Entry'
  | 'CaseStudy Entry'
  | 'Quotes Entry Collection';


// EntryGroup1:
// This regroups the following: 'BannerHomePage Entry' | 'BannerBlogPage Entry' | 'FooterCopyright Entry' | 'CaseStudy Entry'
export type EntryGroup1_propsType = {
  title?: string,
  description?: { json: { content: Node[] } },
};

export type EntryGroup2_propsType = {
  sys?: {
    id?: string;
  };
  parentId?: string;
  order?: number;
  icon?: string;
  title?: string;
  blurb?: string;
};


// CDP: ContentfulDataProvider
export type CDP_context1 = {
  item: EntryGroup1_propsType;
  __isNormalized?: boolean;
};
export type CDP_context2 = {
  items: EntryGroup2_propsType[];
  __isNormalized?: boolean;
};


export interface CDP_propsType {
  dataFor: dataFor1 | dataFor2;
  contentId?: string;
  children: (props: CDP_context1 | CDP_context2) => ReactNode;
}



/**
 * TODO: All context skeletons should be coming from the component library
 */
export const skeleton_context1: CDP_context1 = {
  item: {
    title: undefined,
    description: undefined
  }
};
export const skeleton_context2: CDP_context2 = {
  items: [
    {
      sys: {
        id: undefined,
      },
      parentId: undefined,
      order: undefined,
      icon: undefined,
      title: undefined,
      blurb: undefined,
    },
    {
      sys: {
        id: undefined,
      },
      parentId: undefined,
      order: undefined,
      icon: undefined,
      title: undefined,
      blurb: undefined,
    },
    {
      sys: {
        id: undefined,
      },
      parentId: undefined,
      order: undefined,
      icon: undefined,
      title: undefined,
      blurb: undefined,
    },
  ]
};
 
 



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
