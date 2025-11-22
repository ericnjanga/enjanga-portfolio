import LandingPage from './home/page';
import type { DataFor1, DataFor2, DataFor3, ContextType1, ContextType2, ContextType3 } from '@utils/dataProcessing/types';
import { getDataEntry } from '@utils/dataProcessing';
import { contentfulContentIds } from '@/libs/contentful/contentful-queryConfig';
import { fetchImageUrl } from '@utils/dataProcessing/fetchImageUrl';



export default async function Page() { 
  // Fetching all data needed for this page
  const dataBanner: ContextType1         = await getDataEntry('BannerHomePage Entry' as DataFor1);
  const dataListExpertise: ContextType2  = await getDataEntry('scopeOfExp Parent Entry Collection' as DataFor2);
  const dataAbout: ContextType2          = await getDataEntry('AboutInfo Entry Collection' as DataFor2);
  const dataListQuotes: ContextType3     = await getDataEntry('Quotes Entry Collection' as DataFor3);
  const bgImgUrl = await fetchImageUrl(contentfulContentIds.categories['Featured Image']);

  
  // console.log('...dataListQuotes=', dataListQuotes);

  return (
    <LandingPage 
      banner={dataBanner}
      listExpertise={dataListExpertise}
      listAbout={dataAbout}
      backgroundImgUrl={bgImgUrl}
      listQuotes={dataListQuotes}
    />
  );
}
