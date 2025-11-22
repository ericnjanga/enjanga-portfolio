import PageListing from "@utils/layouts/PageListing";
import type { DataFor1, DataFor4, ContextType1, ContextType4 } from '@utils/dataProcessing/types';
import { getDataEntry } from '@utils/dataProcessing';

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
