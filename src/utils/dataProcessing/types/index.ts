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

// DataFor1: ContentModel1 -> ContextType1
export type DataFor1 = 'Metadata Entry' | 'BannerHomePage Entry' | 'BannerBlogPage Entry' | 'FooterCopyright Entry' | 'CaseStudy Entry' | 'BlogPost Entry' | 'FooterLinks --Entry--';

// DataFor2: ContentModel2[] -> ContextType2
export type DataFor2 = 'scopeOfExp Parent Entry Collection' | 'scopeOfExp Entry Collection' | 'AboutInfo Entry Collection';

// DataFor3: ContentModel1[] -> ContextType3
export type DataFor3 = 'Quotes Entry Collection';

// DataFor4: ContentModel3[] -> ContextType4
export type DataFor4 = 'CaseStudy Entry Collection' | 'BlogPost Entry Collection';

// DataFor5: ContentModel4[] -> ContextType5
export type DataFor5 = 'FooterLinks Entry Collection';
export const getDataType = (dataFor: DataFor1 | DataFor2 | DataFor3 | DataFor4 | DataFor5): string => {
  switch(dataFor) {
    case 'Metadata Entry':
    case 'BannerHomePage Entry':
    case 'BannerBlogPage Entry':
    case 'FooterCopyright Entry':
    case 'CaseStudy Entry':
    case 'BlogPost Entry':
    case 'FooterLinks --Entry--':
      return 'DataFor1';
    
    case 'scopeOfExp Parent Entry Collection':
    case 'scopeOfExp Entry Collection':
    case 'AboutInfo Entry Collection':
      return 'DataFor2';

    case 'Quotes Entry Collection':
      return 'DataFor3';

    case 'CaseStudy Entry Collection':
    case 'BlogPost Entry Collection':
      return 'DataFor4';

    case 'FooterLinks Entry Collection':
      return 'DataFor5';
  }
};

 

/**
 * Content Models groups:
 * ------------------------------------------------------------------
 * Shapes incoming content models from ContentFul into specific data structures.
 */
export type ContentModel1 = {
  title?: string;
  blurb?: string;
  description?: { json: { content: Node[] } };
};

export type ContentModel2 = {
  sys?: {
    id?: string;
  };
  parentId?: string;
  order?: number;
  icon?: string;
  title?: string;
  blurb?: string;
  description?: { json: { content: Node[] } };
};

export type ContentModel3 = {
  sys?: {
    id?: string;
  }; 
  order?: number; 
  title?: string;
  blurb?: string;
  description?: { json: { content: Node[] } };
  image?: {
    url: string;
    title: string;
    description: string;
  }
};

export type ContentModel4 = {
  sys?: {
    id?: string;
  }; 
  order?: number; 
  title?: string; 
  description?: { json: { content: Node[] } };
};
 

/**
 * Context types:
 * ------------------------------------------------------------------
 * Define the context provider data structure based on which 
 * content model is provided.
 */ 
export type ContextType1 = {
  item: ContentModel1;
  __isNormalized?: boolean;
};
export type ContextType2 = {
  items: ContentModel2[];
  __isNormalized?: boolean;
};
export type ContextType3 = {
  items: ContentModel1[];
  __isNormalized?: boolean;
};
export type ContextType4 = {
  items: ContentModel3[];
  __isNormalized?: boolean;
};
export type ContextType5 = {
  items: ContentModel4[];
  __isNormalized?: boolean;
};
 

/**
 * CDP_EG1: Context Data Provider | EG: Entry Group
 * ------------------------------------------------------------------
 * Define the context provider data structure based on which 
 * content model is provided.
 */ 
export interface CDP_propsType {
  dataFor: DataFor1 | DataFor2 | DataFor3 | DataFor4 | DataFor5;
  contentId?: string;
  children: (props: ContextType1 | ContextType2 | ContextType3 | ContextType4 | ContextType5) => ReactNode;
}
export interface CDP_EG1 {
  dataFor: DataFor1;
  contentId?: string;
  children: (props: ContextType1) => ReactNode;
}
export interface CDP_EG2 {
  dataFor: DataFor2;
  contentId?: string;
  children: (props: ContextType2) => ReactNode;
}
export interface CDP_EG3 {
  dataFor: DataFor3;
  contentId?: string;
  children: (props: ContextType3) => ReactNode;
}
 
export interface CDP_EG4 {
  dataFor: DataFor4;
  contentId?: string;
  children: (props: ContextType4) => ReactNode;
}
export interface CDP_EG5 {
  dataFor: DataFor5;
  contentId?: string;
  children: (props: ContextType5) => ReactNode;
}
 
 
 

/**
 * Context skeletons:
 * ------------------------------------------------------------------
 * Define the context provider's default value looks depending on 
 * which context type we are returning
 */ 
export const skeleton_context1: ContextType1 = {
  item: {
    title: undefined,
    description: undefined
  }
};
export const skeleton_context2: ContextType2 = {
  items: [
    {
      sys: {
        id: '0',
      },
      parentId: undefined,
      order: undefined,
      icon: undefined,
      title: undefined,
      blurb: undefined,
    },
    {
      sys: {
        id: '1',
      },
      parentId: undefined,
      order: undefined,
      icon: undefined,
      title: undefined,
      blurb: undefined,
    },
    {
      sys: {
        id: '2',
      },
      parentId: undefined,
      order: undefined,
      icon: undefined,
      title: undefined,
      blurb: undefined,
    },
  ]
};
export const skeleton_context3: ContextType3 = {
  items: [{
    title: undefined,
    description: undefined
  }]
};
export const skeleton_context4: ContextType4 = {
  items: [{
    sys: {
      id: '0',
    },
    order: undefined,
    title: undefined,
    blurb: undefined,
    description: undefined,
  }, {
    sys: {
      id: '1',
    },
    order: undefined,
    title: undefined,
    blurb: undefined,
    description: undefined,
  }]
};
export const skeleton_context5: ContextType5 = {
  items: [{
    sys: {
      id: '0',
    },
    order: undefined,
    title: undefined, 
    description: undefined,
  }, {
    sys: {
      id: '1',
    },
    order: undefined,
    title: undefined, 
    description: undefined,
  }, {
    sys: {
      id: '2',
    },
    order: undefined,
    title: undefined, 
    description: undefined,
  }]
};
