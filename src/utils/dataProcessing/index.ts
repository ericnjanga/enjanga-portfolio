
import { contentfulForServerEntriesFetch } from '@/libs/contentful/contentful-forServerFetchEntries';
import getFormatedDataForContext from '@utils/dataProcessing/getFormatedDataForContext';
import type { DataFor1, DataFor2, DataFor3, DataFor4, DataFor5 } from './types';


/**
 * Fetch entry from ContentFul, then format it for the blog post context.
 * @param slugId 
 * @param dataFor 
 * @returns 
 */
export async function getDataEntry(slugId: string, dataFor: DataFor1 | DataFor2 | DataFor3 | DataFor4 | DataFor5) {
  const entry = await contentfulForServerEntriesFetch(dataFor, slugId);
  return getFormatedDataForContext(entry, dataFor as DataFor1);
};