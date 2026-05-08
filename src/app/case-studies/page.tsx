import PageListing from "@utils/layouts/PageListing";
import type { DataFor1, ContextType1, ContextType4 } from '@utils/dataProcessing/types';
import { getDataEntry } from '@utils/dataProcessing';
import { getMetadata } from '@/libs/metadata';
import { fetchBlogPosts } from '@/libs/blogPosts';


// Todo: 1) Move this constant to contentfulContentIds
// Todo: 2) Ask chatGPT what would be a proper way to organize and rename contentfulContentIds
const CASE_STUDIES_PAGE_ID = '4czA1kydEnYoXAWoLbdijZ';

/**
 * Metadata title and description route update
 * @returns 
 */
export async function generateMetadata() {
  const data = await getMetadata(CASE_STUDIES_PAGE_ID);
  return {
    title: data.title || 'Case Studies',
    description: data.description
  }
}

export default async function Page() {
  // Fetching all data needed for this page
  const dataBanner: ContextType1 = await getDataEntry('BannerBlogPage Entry' as DataFor1);
  const posts = await fetchBlogPosts();
  const dataListOfEntries: ContextType4 = {
    items: posts.map((post) => ({
      sys: { id: post.id },
      slug: post.slug,
      title: post.title,
      blurb: post.blurb,
      description: post.description,
      organization: post.organization,
    })),
  };

  return (
    <PageListing 
      banner={dataBanner}
      listOfEntries={dataListOfEntries}
    />
  );
}
