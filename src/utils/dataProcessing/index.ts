
import { contentfulForServerEntriesFetch } from '@/libs/contentful/contentful-forServerFetchEntries';
import getFormatedDataForContext from '@utils/dataProcessing/getFormatedDataForContext';
import type { ContextType1, ContextType2, ContextType3, DataFor1, DataFor2, DataFor3, DataFor4, DataFor5 } from './types';
import { skeleton_context1, getDataType } from './types';


/**
 * Fetch entry from ContentFul, then format it for the blog post context.
 * @param slugId 
 * @param dataFor 
 * @returns 
 */


export function getDataEntry(dataFor: DataFor1, slugId?: string): Promise<ContextType1>;  
export function getDataEntry(dataFor: DataFor2, slugId?: string): Promise<ContextType2>;  
export function getDataEntry(dataFor: DataFor3, slugId?: string): Promise<ContextType3>;  

export async function getDataEntry(dataFor: DataFor1 | DataFor2 | DataFor3 | DataFor4 | DataFor5, slugId?: string): Promise<ContextType1 | ContextType2 | ContextType3> {
  const entry = await contentfulForServerEntriesFetch(dataFor, slugId);

  if (Array.isArray(entry) && entry.length > 0) {
    if (getDataType(dataFor)==='DataFor1') {
      return getFormatedDataForContext(entry, dataFor as DataFor1); 
    }
    if (getDataType(dataFor)==='DataFor2') {
      return getFormatedDataForContext(entry, dataFor as DataFor2); 
    }
    if (getDataType(dataFor)==='DataFor3') {
      return getFormatedDataForContext(entry, dataFor as DataFor3); 
    }
  }

  return skeleton_context1;
};