// src/libs/ContentfulDataProvider.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useContentfulForClientEntries } from './hooks/useContentfulForClientEntries';
import type { Node } from '@contentful/rich-text-types';
import { InformationBlock } from './types';
import { CQ_quote_propsType } from 'enjanga-components-library';
import { sortByOrderProp } from '@utils/helpers'; 
import { getContentfulQueryConfig } from './contentful-queryConfig';
import { DataFor } from './contentful-queryConfig';


interface ContentContextValue {
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
  items?: InformationBlock[];
  orderedItems?: InformationBlock[] | CQ_quote_propsType[];
}

const ContentContext = createContext<ContentContextValue | undefined>(
  undefined
);

interface ContentfulDataProviderProps {
  dataFor: DataFor;
  contentId?: string;
  children: (props: ContentContextValue) => ReactNode;
}

export const ContentfulDataProvider: React.FC<ContentfulDataProviderProps> = ({
  dataFor,
  contentId = '',
  children,
}) => {
  const { query, variables, trackingInfo } = getContentfulQueryConfig(dataFor, contentId);

  const { data } = useContentfulForClientEntries({
    query,
    variables,
    queryKey: `${trackingInfo}-${contentId}`,
    infoTracking: trackingInfo,
  });
  



  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  console.log('>>>>> entries = ', data);
  //   return entries.map((entry: { sys: { id: string } }) => ({
  //   contentId: entry.sys.id,
  // }));
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  

  let plainDescription;
  let richDescription;

  switch (dataFor) {
    case 'Landing Page Banner':
    case 'Blog Page Banner':
    case 'Footer Copyright':
    case 'Single Work':
    case 'Single Blog Entry':
      if (dataFor==='Single Blog Entry') 
      console.log('....-----data?', data);
      richDescription = data?.en?.description;
      break;
  }

  const id = data?.en?.sys?.id ?? '';
  const title = data?.en?.title ?? '';
  const blurb = data?.en?.blurb ?? '';
  const image = data?.en?.image;
  const items = data?.en?.items;
  let orderedItems;

  switch (trackingInfo) {
    case 'List of Scope of expertise':
    case 'InfoBlock by parentId':
    case 'Collection of Blog Posts':
    case 'List of Best Work':
    case 'List of quotes':
    case 'List of About Info':
    case 'List of Footer Links':
      orderedItems = sortByOrderProp(items);
      break;
  }

  const value: ContentContextValue = {
    id,
    title,
    blurb,
    image,
    plainDescription,
    richDescription,
    items,
    orderedItems,
  };

  return <>{children(value)}</>;
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentfulDataProvider');
  }
  return context;
};
