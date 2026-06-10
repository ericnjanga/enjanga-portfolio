import RouteHome from '@/components/RouteHome/RouteHome';
import type {
  DataFor1,
  DataFor2,
  DataFor3
} from '@utils/dataProcessing/types';
import { getDataEntry } from '@utils/dataProcessing';
import { contentfulContentIds } from '@/libs/contentful/contentful-queryConfig';
import { fetchImageUrl } from '@utils/dataProcessing/fetchImageUrl';
import { fetchOrganizations } from '@/libs/organizations';
import { fetchLatestFeaturedBlogPost } from '@/libs/blogPosts';

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
    bgImgUrl,
    organizations,
    featuredBlogPost,
  ] = await Promise.all([
    getDataEntry('BannerHomePage Entry' as DataFor1),
    getDataEntry('Expertise Parent Entry Collection' as DataFor2),
    getDataEntry('AboutInfo Entry Collection' as DataFor2),
    getDataEntry('Quotes Entry Collection' as DataFor3),
    fetchImageUrl(contentfulContentIds.categories['Featured Image']),
    fetchOrganizations(),
    fetchLatestFeaturedBlogPost(),
  ]);

  // Fetch expertise panel data once we have the tabs
  const dataListExpertisePanels = await Promise.all(
    dataListExpertiseTabs?.items.map(async(_) => {
      return ({
        parentId: _.sys?.id,
        data: await getDataEntry('Expertise Entry Collection' as DataFor2, _.sys?.id)
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
      organizations={organizations}
      featuredBlogPost={featuredBlogPost}
    />
  );
}
