import type { Node } from '@contentful/rich-text-types';

// EntryGroup1:
// This regroups the following: 'BannerHomePage Entry' | 'BannerBlogPage Entry' | 'FooterCopyright Entry' | 'CaseStudy Entry'
export type EntryGroup1_propsType = {
  title: string,
  description: { json: { content: Node[] } },
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
