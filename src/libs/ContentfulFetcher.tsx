// src/libs/ContentfulFetcher.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useContentful } from '@/hooks/useContentful';
import type { Node } from '@contentful/rich-text-types';
import { InformationBlock } from './CMS-content-types';
import { CQ_quote_propsType } from 'enjanga-components-library';
import { sortByOrderProp } from '@utils/helpers';
import { getQueryConfig, DataFor } from './fetchEntries';

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

interface ContentfulFetcherProps {
  dataFor: DataFor;
  contentId?: string;
  children: (props: ContentContextValue) => ReactNode;
}

export const ContentfulFetcher: React.FC<ContentfulFetcherProps> = ({
  dataFor,
  contentId = '',
  children,
}) => {
  const { query, variables, trackingInfo } = getQueryConfig(dataFor, contentId);

  const { data, isLoading, error } = useContentful({
    query,
    variables,
    queryKey: `${trackingInfo}-${contentId}`,
    infoTracking: trackingInfo,
  });

  let plainDescription;
  let richDescription;

  switch (dataFor) {
    case 'Landing Page Banner':
    case 'Blog Page Banner':
    case 'Footer Copyright':
    case 'Single Work':
    case 'Single Blog Post':
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
    case 'List of Blog Posts':
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
    throw new Error('useContent must be used within ContentfulFetcher');
  }
  return context;
};
