import PageListing from "@utils/layouts/PageListing";
import type { DataFor1, DataFor4, ContextType1, ContextType4 } from '@utils/dataProcessing/types';
import { getDataEntry } from '@utils/dataProcessing';
import { getMetadata } from '@/libs/metadata';


// Todo: 1) Move this constant to contentfulContentIds
// Todo: 2) Ask chatGPT what would be a proper way to organize and rename contentfulContentIds
const BLOG_PAGE_ID = '4czA1kydEnYoXAWoLbdijZ';

/**
 * Metadata title and description route update
 * @returns 
 */
export async function generateMetadata() {
  const data = await getMetadata(BLOG_PAGE_ID);
  return {
    title: data.title,
    description: data.description
  }
}

export default async function Page() {
  // Fetching all data needed for this page
  const dataBanner: ContextType1          = await getDataEntry('BannerBlogPage Entry' as DataFor1);
  const dataListOfEntries: ContextType4   = await getDataEntry('BlogPost Entry Collection' as DataFor4);

  return (
    <PageListing 
      banner={dataBanner}
      listOfEntries={dataListOfEntries}
    />
  );
}
