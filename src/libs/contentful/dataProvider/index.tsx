// src/libs/ContentfulDataProvider.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { useContentfulForClientEntries } from '../hooks/useContentfulForClientEntries';
import { CDP_propsType } from './types';
import { EntryGroup1_propsType } from '../types';
import getFormatedDataForContext from './getFormatedDataForContext';
import { useEffect, useState } from 'react';



const ContentContext = createContext<EntryGroup1_propsType | undefined>(
  undefined
);



export const ContentfulDataProvider = ({
  dataFor,
  contentId = '',
  children,
}: CDP_propsType) => {
  
  /**
   * TODO: This skeleton is not working (Findout what the correct skeleton is in the component library)
   * Maybe I need to move this skeleton to a separate file
   */
  const contextSkeleton: EntryGroup1_propsType = {
    title: '',
    description: { json: { content: [] } }
  };
  const [contextValue, setContextValue] = useState<EntryGroup1_propsType>(contextSkeleton);
  const { data } = useContentfulForClientEntries(dataFor, contentId);


  useEffect(() => {
    let isMounted = true;

    if (Array.isArray(data) && data.length > 0) {
      const formatedData = getFormatedDataForContext(data, dataFor);

      if (isMounted && formatedData) {
        setContextValue(formatedData);
      }

      return () => {
        isMounted = false;
      };
    }
  }, [data, dataFor]);

  return (
    <ContentContext.Provider value={contextValue}>
      {children(contextValue)}
    </ContentContext.Provider>
  );
};

// Only if other components shouldn’t depend on being nested inside the provider’s render-prop
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within ContentfulDataProvider');
  }
  return context;
};
 