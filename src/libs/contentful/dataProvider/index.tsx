// src/libs/ContentfulDataProvider.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { useContentfulForClientEntries } from '../hooks/useContentfulForClientEntries';
import { CDP_propsType } from '../types';
import type { 
  dataFor1, dataFor2, dataFor3,
  CDP_context1, CDP_context2, CDP_context3,
} from '../types';
import { 
  skeleton_context1,
  skeleton_context2,
  skeleton_context3,
  getDataType
} from '../types'; 
import getFormatedDataForContext from './getFormatedDataForContext';
import { useEffect, useState } from 'react';



const ContentContext = createContext<CDP_context1 | CDP_context2 | CDP_context3>(
  skeleton_context1
);



export const ContentfulDataProvider = ({
  dataFor,
  contentId = '',
  children,
}: CDP_propsType) => {
  
  const contextType = getDataType(dataFor);
  const [contextEG1, setContextEG1] = useState<CDP_context1>(skeleton_context1);
  const [contextEG2, setContextEG2] = useState<CDP_context2>(skeleton_context2);
  const [contextEG3, setContextEG3] = useState<CDP_context2>(skeleton_context3);
  const { data } = useContentfulForClientEntries(dataFor, contentId);


  useEffect(() => {
    let isMounted = true;

    if (Array.isArray(data) && data.length > 0) {
      if (getDataType(dataFor)==='dataFor1') {
        let formatedData1 = getFormatedDataForContext(data, dataFor as dataFor1);
        if (isMounted && formatedData1?.__isNormalized) {
          setContextEG1(formatedData1);
        }
      }
      if (getDataType(dataFor)==='dataFor2') {
        let formatedData2 = getFormatedDataForContext(data, dataFor as dataFor2);
        if (isMounted && formatedData2?.__isNormalized) {
          setContextEG2(formatedData2);
        }
      }
      if (getDataType(dataFor)==='dataFor3') {
        let formatedData3 = getFormatedDataForContext(data, dataFor as dataFor3);
        if (isMounted && formatedData3?.__isNormalized) {
          setContextEG3(formatedData3);
        }
      }

       console.log('+++++++++++++++++++++++++++++++++++contextType***', contextType );

      return () => {
        isMounted = false;
      };
    }
  }, [data, dataFor, contextType]);

  return (
    <>
      {contextType==='dataFor1' &&
        <ContentContext.Provider value={contextEG1}>
          {children(contextEG1)}
        </ContentContext.Provider>
      }
      {contextType==='dataFor2' &&
        <ContentContext.Provider value={contextEG2}>
          {children(contextEG2)}
        </ContentContext.Provider>
      }
      {contextType==='dataFor3' &&
        <ContentContext.Provider value={contextEG3}>
          {children(contextEG3)}
        </ContentContext.Provider>
      }
    </>
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
 