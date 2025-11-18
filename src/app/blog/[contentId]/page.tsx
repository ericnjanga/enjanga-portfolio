// src/app/blog/[contentId]/page.tsx  (server component by default)
import { generateParamsForContent } from '@/libs/generateStaticParams'; 
import DynamicPageBlog from './DynamicPageBlog';
import type { DynamicPageServer } from '@/libs/types';

/*
 * This function tells Next.js which dynamic routes to pre-render at build time
 * when running in static export mode (output: "export").
 * It calls our shared utility (generateParamsForContent) to fetch all blog posts
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
  return generateParamsForContent('BlogPost Entry Collection');
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
  return <DynamicPageBlog params={{ contentId }} />;
}
