import LandingPage from './home/page';
import type { DataFor1, DataFor2, ContextType1, ContextType2 } from '@utils/dataProcessing/types';
import { getDataEntry } from '@utils/dataProcessing';



export default async function Page() { 
  // Fetching all data needed for this page
  const dataBanner:ContextType1         = await getDataEntry('BannerHomePage Entry' as DataFor1);
  const dataListExpertise:ContextType2  = await getDataEntry('scopeOfExp Parent Entry Collection' as DataFor2);
  const dataAbout:ContextType2          = await getDataEntry('AboutInfo Entry Collection' as DataFor2);

  // console.log('...dataAbout=', dataAbout);

  return (
    <LandingPage 
      banner={dataBanner}
      listExpertise={dataListExpertise}
      listAbout={dataAbout}
      // backgroundImg
    />
  );
}
