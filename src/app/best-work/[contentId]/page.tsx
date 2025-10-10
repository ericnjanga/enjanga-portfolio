// src/app/best-work/[contentId]/page.tsx  (server component by default)
import { generateParamsForContent } from '@/libs/generateStaticParams';
import ProjectPage from './ProjectPage';

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
   * Although generateStaticParams() is asynchronous, Next.js automatically
   * awaits it internally when pre-generating static pages.
   * 
   * In other words, generateStaticParams() itself returns a Promise, but by the time
   * the static build completes, Next.js has already resolved that Promise.
   */
  return generateParamsForContent('CaseStudy Entry Collection');
}


export default async function Page({ params }: { params: { contentId: string } }) {
  /**
   * By the time Page() executes, `params` is already a plain JavaScript object,
   * not a Promise. Next.js resolves it for us before rendering.
   * 
   * This is why we can use `params` directly, without awaiting or fulfilling it.
   */
  const data = { contentId: params.contentId };
  return <ProjectPage params={data} />;
}