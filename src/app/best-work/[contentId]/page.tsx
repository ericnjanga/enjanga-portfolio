// src/app/best-work/[contentId]/page.tsx  (server component by default)
import { generateParamsForContent } from '@/libs/generateStaticParams';
import DynamicPageProject from './DynamicPageProject';
import type { DynamicPageServer } from '@/libs/types';

/*
 * This function tells Next.js which dynamic routes to pre-render at build time
 * when running in static export mode (output: "export").
 * It uses our shared utility (generateParamsForContent) to fetch all "Best Work"
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
  return generateParamsForContent('CaseStudy Entry Collection');
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
  return <DynamicPageProject params={{ contentId }} />;
}