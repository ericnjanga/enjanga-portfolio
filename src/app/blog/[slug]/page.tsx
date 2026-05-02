import { getAllContentSlugs } from '@utils/SSG';
import type { DynamicPageServerSlug } from '@/libs/types';
import PageEntry from "@utils/layouts/PageEntry";
import { ContextType1 } from "@utils/dataProcessing/types";
import { getDataEntry } from '@utils/dataProcessing';

/*
 * This function tells Next.js which dynamic routes to pre-render at build time
 * when running in static export mode (output: "export").
 * It calls our shared utility (getAllContentSlugs) to fetch all blog posts
 * from Contentful, then returns their slugs as route params.
 * Example: if Contentful has posts with slug = "abc" and "xyz",
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
  return getAllContentSlugs('BlogPost Entry Collection');
}




/**
 * Metadata title and description route update
 * @returns 
 */
const DATAFOR = 'BlogPost Entry';
export async function generateMetadata(props: DynamicPageServerSlug) {
  const { slug } = await props.params;
  const data:ContextType1 = await getDataEntry(DATAFOR, slug);

  // Extract metadata
  const title = `${data?.item?.title} | Eric Njanga on Web Performance & UX.`;
  const description = `${data?.item?.blurb} | Insights from consultant Eric Njanga on performance-focused UX and front-end strategy.`;
 
  return { title, description }
}


export default async function Page(props: DynamicPageServerSlug) {
  /**
   * In the latest Next.js App Router, `params` can be a React-wrapped Promise
   * during server rendering. It must be awaited before accessing its properties.
   *
   * This ensures that React has resolved the async boundary before we read values
  * like `slug`.
   */
  const { slug } = await props.params;
  const data:ContextType1 = await getDataEntry(DATAFOR, slug);

  return <PageEntry {...data} />;
}