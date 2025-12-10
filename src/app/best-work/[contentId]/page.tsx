import { getAllContentIds } from '@utils/SSG';
import type { DynamicPageServer } from '@/libs/types';
import PageEntry from "@utils/layouts/PageEntry";
import { ContextType1 } from "@utils/dataProcessing/types";
import { getDataEntry } from '@utils/dataProcessing';

/*
 * This function tells Next.js which dynamic routes to pre-render at build time
 * when running in static export mode (output: "export").
 * It uses our shared utility (getAllContent***) to fetch all "Best Work"
 * entries from Contentful, then returns their IDs as route params.
 * Example: if Contentful has works with sys.id = "alpha" and "beta",
 * Next.js will generate /best-work/alpha and /best-work/beta as static pages.
*/
export async function generateStaticParams() {
  /**
   * Although generateStaticPar***() is asynchronous, Next.js automatically
   * awaits it internally when pre-generating static pages.
   * 
   * In other words, generateStaticPar***() itself returns a Promise, but by the time
   * the static build completes, Next.js has already resolved that Promise.
   */
  return getAllContentIds('CaseStudy Entry Collection');
}




/**
 * Metadata title and description route update
 * @returns 
 */
const DATAFOR = 'CaseStudy Entry';

export async function generateMetadata(props: DynamicPageServer) {
  const { contentId } = await props.params;
  const data:ContextType1 = await getDataEntry(DATAFOR, contentId);

  // Extract metadata
  const title = `${data?.item?.title} | Performance Case Study by Eric Njanga.`;
  const description = `${data?.item?.blurb} | A performance-driven React/Next.js case study by consultant Eric Njanga.`;
 
  return { title, description }
}


export default async function Page(props: DynamicPageServer) {
  /**
   * In the latest Next.js App Router, `params` can be a React-wrapped Promise
   * during server rendering. It must be awaited before accessing its properties.
   *
   * This ensures that React has resolved the async boundary before we read values
   * like `contentId`.
   */
  const { contentId } = await props.params; 
  const data:ContextType1 = await getDataEntry(DATAFOR, contentId);
  return <PageEntry {...data} />;
}