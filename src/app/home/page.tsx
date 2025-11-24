import RouteHome from '@/components/RouteHome/RouteHome';
import type {
  DataFor1,
  DataFor2,
  DataFor3,
  DataFor4
} from '@utils/dataProcessing/types';
import { getDataEntry } from '@utils/dataProcessing';
import { contentfulContentIds } from '@/libs/contentful/contentful-queryConfig';
import { fetchImageUrl } from '@utils/dataProcessing/fetchImageUrl';

export default async function LandingPage() {
  /**
   * Fetching all the data needed for this app
   * NOTE: This app is static, there is no need to pull data dynamically on the client
   */
  const [
    dataBanner,
    dataListExpertiseTabs,
    dataAbout,
    dataListQuotes,
    dataListBestWork,
    bgImgUrl,
  ] = await Promise.all([
    getDataEntry('BannerHomePage Entry' as DataFor1),
    getDataEntry('scopeOfExp Parent Entry Collection' as DataFor2),
    getDataEntry('AboutInfo Entry Collection' as DataFor2),
    getDataEntry('Quotes Entry Collection' as DataFor3),
    getDataEntry('CaseStudy Entry Collection' as DataFor4),
    fetchImageUrl(contentfulContentIds.categories['Featured Image']),
  ]);

  // Fetch expertise panel data once we have the tabs
  const dataListExpertisePanels = await Promise.all(
    dataListExpertiseTabs?.items.map(async(_) => {
      return ({
        parentId: _.sys?.id,
        data: await getDataEntry('scopeOfExp Entry Collection' as DataFor2, _.sys?.id)
      });
    })
  );

  return (
    <RouteHome
      banner={dataBanner}
      listExpertiseTabs={dataListExpertiseTabs}
      listExpertisePanels={dataListExpertisePanels}
      listAbout={dataAbout}
      backgroundImgUrl={bgImgUrl}
      listQuotes={dataListQuotes}
      listBestWork={dataListBestWork}
    />
  );
}
