// src/libs/ContentfulDataProvider.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { useContentfulForClientEntries } from '../hooks/useContentfulForClientEntries';
import { CDP_context_propsType, CDP_propsType } from './types';
import getFormatedDataForContext from './getFormatedDataForContext';



const ContentContext = createContext<CDP_context_propsType | undefined>(
  undefined
);


export const ContentfulDataProvider = ({
  dataFor,
  contentId = '',
  children,
}: CDP_propsType) => {

  const { data } = useContentfulForClientEntries(dataFor, contentId);
  const value = getFormatedDataForContext(data, dataFor);

  return <>{children(value)}</>;
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentfulDataProvider');
  }
  return context;
};
