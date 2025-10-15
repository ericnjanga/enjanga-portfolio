// src/libs/ContentfulDataProvider.tsx
'use client';

import React, { createContext, useContext } from 'react';
import { useContentfulForClientEntries } from '../hooks/useContentfulForClientEntries';
import { CDP_propsType, CDP_EG1, CDP_EG2, CDP_EG3, CDP_EG4, CDP_EG5 } from '../types';
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


/**
 * PROBLEM/TEMPORARY SOLUTION:
 * -------------
 * Returning a context based on a union type creates problems in the JSX as typescript get confused. 
 * The solution I will use for now is to create a context for each type.
 */
// const ContentContext = createContext<ContextType1 | ContextType2 | ContextType3 | ContextType4 | ContextType5>(
//   skeleton_context1
// );
const TheContextEG1 = createContext<ContextType1>( // For Entry Group1 (EG1)
  skeleton_context1
);
const TheContextEG2 = createContext<ContextType2>( // For Entry Group2 (EG2)
  skeleton_context2
);
const TheContextEG3 = createContext<ContextType3>( // For Entry Group3 (EG3)
  skeleton_context3
);
const TheContextEG4 = createContext<ContextType4>( // For Entry Group4 (EG4)
  skeleton_context4
);
const TheContextEG5 = createContext<ContextType5>( // For Entry Group5 (EG5)
  skeleton_context5
);




function ContentfulDataProvider(props: CDP_EG1): React.ReactElement<ContextType1>;  
function ContentfulDataProvider(props: CDP_EG2): React.ReactElement<ContextType2>;  
function ContentfulDataProvider(props: CDP_EG3): React.ReactElement<ContextType3>;  
function ContentfulDataProvider(props: CDP_EG4): React.ReactElement<ContextType4>;  
function ContentfulDataProvider(props: CDP_EG5): React.ReactElement<ContextType5>; 

function ContentfulDataProvider(props: CDP_EG1 | CDP_EG2 | CDP_EG3 | CDP_EG4 | CDP_EG5): React.ReactElement<ContextType1 | ContextType2 | ContextType3 | ContextType4 | ContextType5> {

  const { dataFor, contentId = '' } = props;
  const contextType = getDataType(dataFor);
  const [contextEG1, setContextEG1] = useState<ContextType1>(skeleton_context1);
  const [contextEG2, setContextEG2] = useState<ContextType2>(skeleton_context2);
  const [contextEG3, setContextEG3] = useState<ContextType3>(skeleton_context3);
  const [contextEG4, setContextEG4] = useState<ContextType4>(skeleton_context4);
  const [contextEG5, setContextEG5] = useState<ContextType5>(skeleton_context5);
  const { data } = useContentfulForClientEntries(dataFor, contentId);
  


  useEffect(() => {
    let isMounted = true;

    if (Array.isArray(data) && data.length > 0) {
      if (getDataType(dataFor)==='DataFor1') {
        let formatedData1 = getFormatedDataForContext(data, dataFor as DataFor1); 
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

  // Narrow by discriminat then call the correctly-typed render prop
  if (getDataType(dataFor)==='DataFor1') {
    const render = props.children as (v: ContextType1) => React.ReactNode;
    return (
      <TheContextEG1.Provider value={contextEG1}>
        {render(contextEG1)}
      </TheContextEG1.Provider>
    );
  } else if (getDataType(dataFor)==='DataFor2') {
    const render = props.children as (v: ContextType2) => React.ReactNode;
    return (
      <TheContextEG2.Provider value={contextEG2}>
        {render(contextEG2)}
      </TheContextEG2.Provider>
    );
  } else if (getDataType(dataFor)==='DataFor3') {
    const render = props.children as (v: ContextType3) => React.ReactNode;
    return (
      <TheContextEG3.Provider value={contextEG3}>
        {render(contextEG3)}
      </TheContextEG3.Provider>
    );
  } else if (getDataType(dataFor)==='DataFor4') {
    const render = props.children as (v: ContextType4) => React.ReactNode;
    return (
      <TheContextEG4.Provider value={contextEG4}>
        {render(contextEG4)}
      </TheContextEG4.Provider>
    );
  } else {
    const render = props.children as (v: ContextType5) => React.ReactNode;
    return (
      <TheContextEG5.Provider value={contextEG5}>
        {render(contextEG5)}
      </TheContextEG5.Provider>
    );
  }
};

// NOTE: For using the context in the JSX as a value 
// Only if other components shouldn’t depend on being nested inside the provider’s render-prop
// export const useContent = () => {
//   const context = useContext(ContentContext);
//   if (!context) {
//     throw new Error('useContent must be used within ContentfulDataProvider');
//   }
//   return context;
// };
 

export default ContentfulDataProvider;