import { getAllContentIds } from '@utils/SSG';
import type { DynamicPageServer } from '@/libs/types';
import PageEntry from "@utils/layouts/PageEntry";
import { ContextType1 } from "@utils/dataProcessing/types";
import { getDataEntry } from '@utils/dataProcessing';

/*
 * This function tells Next.js which dynamic routes to pre-render at build time
 * when running in static export mode (output: "export").
 * It calls our shared utility (getAllContent***) to fetch all blog posts
 * from Contentful, then returns their IDs as route params.
 * Example: if Contentful has posts with sys.id = "abc" and "xyz",
 * Next.js will generate /blog/abc and /blog/xyz as static pages.
*/
export async function generateStaticParams() {
  /**
   * Although generateStaticPar***() is asynchronous, Next.js automatically
   * awaits it internally when pre-generating static pages.
   * 
   * In other words, generateStaticPar***() itself returns a Promise, but by the time
   * the static build completes, Next.js has already resolved that Promise.
   */
  return getAllContentIds('BlogPost Entry Collection');
}


export default async function Page(props: DynamicPageServer) {
  const dataFor = 'BlogPost Entry';
  /**
   * In the latest Next.js App Router, `params` can be a React-wrapped Promise
   * during server rendering. It must be awaited before accessing its properties.
   *
   * This ensures that React has resolved the async boundary before we read values
   * like `contentId`.
   */
  const { contentId } = await props.params;
  const data:ContextType1 = await getDataEntry(dataFor, contentId);

  return <PageEntry {...data} />;
}