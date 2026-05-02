// import { getAllContentIds } from '@utils/SSG';
import type { DynamicPageServer } from '@/libs/types';
import PageEntry from "@utils/layouts/PageEntry";
import { ContextType1 } from "@utils/dataProcessing/types";
import { skeleton_context1 } from '@utils/dataProcessing/types';

export const dynamicParams = false;

/*
 * This function tells Next.js which dynamic routes to pre-render at build time
 * when running in static export mode (output: "export").
 * It uses our shared utility (getAllContent***) to fetch all "Experience"
 * entries from Contentful, then returns their IDs as route params.
 * Example: if Contentful has works with sys.id = "alpha" and "beta",
 * Next.js will generate /expertise/alpha and /expertise/beta as static pages.
*/
export async function generateStaticParams() {
  /**
   * Although generateStaticPar***() is asynchronous, Next.js automatically
   * awaits it internally when pre-generating static pages.
   * 
   * In other words, generateStaticPar***() itself returns a Promise, but by the time
   * the static build completes, Next.js has already resolved that Promise.
   */
  // `CaseStudy Entry Collection` was removed from Contentful.
  // Keep the route file temporarily, but stop generating static pages from it.
  // return getAllContentIds('CaseStudy Entry Collection');
  // Next.js static export requires at least one static param for dynamic segments.
  return [{ contentId: 'unavailable' }];
}




/**
 * Metadata title and description route update
 * @returns 
 */
// const DATAFOR = 'CaseStudy Entry';

export async function generateMetadata(_props: DynamicPageServer) {
  return {
    title: 'Case Study Unavailable | Eric Njanga',
    description: 'This case study content model has been removed from Contentful.',
  };
}


export default async function Page(props: DynamicPageServer) {
  /**
   * In the latest Next.js App Router, `params` can be a React-wrapped Promise
   * during server rendering. It must be awaited before accessing its properties.
   *
   * This ensures that React has resolved the async boundary before we read values
   * like `contentId`.
   */
  const _ = await props.params;
  const data: ContextType1 = {
    ...skeleton_context1,
    item: {
      ...skeleton_context1.item,
      title: 'Case Study Unavailable',
    },
  };
  return <PageEntry {...data} />;
}