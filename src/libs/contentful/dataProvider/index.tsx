// src/libs/ContentfulDataProvider.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { useContentfulForClientEntries } from '../hooks/useContentfulForClientEntries';
import { CDP_propsType } from '../types';
import type { 
  DataFor1, DataFor2, DataFor3, DataFor4, DataFor5,
  ContextType1, ContextType2, ContextType3, ContextType4, ContextType5
} from '../types';
import { 
  skeleton_context1,
  skeleton_context2,
  skeleton_context3,
  skeleton_context4,
  skeleton_context5,
  getDataType
} from '../types'; 
import getFormatedDataForContext from './getFormatedDataForContext';
import { useEffect, useState } from 'react';



const ContentContext = createContext<ContextType1 | ContextType2 | ContextType3 | ContextType4 | ContextType5>(
  skeleton_context1
);



export const ContentfulDataProvider = ({
  dataFor,
  contentId = '',
  children,
}: CDP_propsType) => {
  
  const contextType = getDataType(dataFor);
  const [contextEG1, setContextEG1] = useState<ContextType1>(skeleton_context1);
  const [contextEG2, setContextEG2] = useState<ContextType2>(skeleton_context2);
  const [contextEG3, setContextEG3] = useState<ContextType3>(skeleton_context3);
  const [contextEG4, setContextEG4] = useState<ContextType4>(skeleton_context4);
  const [contextEG5, setContextEG5] = useState<ContextType5>(skeleton_context5);
  const { data } = useContentfulForClientEntries(dataFor, contentId);


        console.log(`---------.   ${dataFor} - ${contentId}   ---------`);
  


  useEffect(() => {
    let isMounted = true;

    if (Array.isArray(data) && data.length > 0) {
      if (getDataType(dataFor)==='DataFor1') {
        let formatedData1 = getFormatedDataForContext(data, dataFor as DataFor1);
        console.log(`**********.   ${dataFor}     **********`);
        if (isMounted && formatedData1?.__isNormalized) {
          setContextEG1(formatedData1);
        }
      }
      if (getDataType(dataFor)==='DataFor2') {
        let formatedData2 = getFormatedDataForContext(data, dataFor as DataFor2);
        if (isMounted && formatedData2?.__isNormalized) {
          setContextEG2(formatedData2);
        }
      }
      if (getDataType(dataFor)==='DataFor3') {
        let formatedData3 = getFormatedDataForContext(data, dataFor as DataFor3);
        if (isMounted && formatedData3?.__isNormalized) {
          setContextEG3(formatedData3);
        }
      }
      if (getDataType(dataFor)==='DataFor4') {
        let formatedData4 = getFormatedDataForContext(data, dataFor as DataFor4);
        if (isMounted && formatedData4?.__isNormalized) {
          setContextEG4(formatedData4);
        }
      }
      if (getDataType(dataFor)==='DataFor5') {
        let formatedData5 = getFormatedDataForContext(data, dataFor as DataFor5);
        if (isMounted && formatedData5?.__isNormalized) {
          setContextEG5(formatedData5);
        }
      }

      return () => {
        isMounted = false;
      };
    }
  }, [data, dataFor, contextType]);

  return (
    <>
      {contextType==='DataFor1' &&
        <ContentContext.Provider value={contextEG1}>
          {children(contextEG1)}
        </ContentContext.Provider>
      }
      {contextType==='DataFor2' &&
        <ContentContext.Provider value={contextEG2}>
          {children(contextEG2)}
        </ContentContext.Provider>
      }
      {contextType==='DataFor3' &&
        <ContentContext.Provider value={contextEG3}>
          {children(contextEG3)}
        </ContentContext.Provider>
      }
      {contextType==='DataFor4' &&
        <ContentContext.Provider value={contextEG4}>
          {children(contextEG4)}
        </ContentContext.Provider>
      }
      {contextType==='DataFor5' &&
        <ContentContext.Provider value={contextEG5}>
          {children(contextEG5)}
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
 