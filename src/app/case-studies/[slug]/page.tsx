import { getAllContentSlugs } from '@utils/SSG';
import type { DynamicPageServerSlug } from '@/libs/types';
import PageEntry from "@utils/layouts/PageEntry";
import { ContextType1 } from "@utils/dataProcessing/types";
import { fetchBlogPostBySlug } from '@/libs/blogPosts';

/*
 * This function tells Next.js which dynamic routes to pre-render at build time
 * when running in static export mode (output: "export").
 * It calls our shared utility (getAllContentSlugs) to fetch all case studies
 * from Contentful, then returns their slugs as route params.
 * Example: if Contentful has posts with slug = "abc" and "xyz",
 * Next.js will generate /case-studies/abc and /case-studies/xyz as static pages.
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
export async function generateMetadata(props: DynamicPageServerSlug) {
  const { slug } = await props.params;
  const post = await fetchBlogPostBySlug(slug);
  const data: ContextType1 = {
    item: {
      sys: { id: post?.id },
      slug: post?.slug,
      title: post?.title,
      blurb: post?.blurb,
      description: post?.description,
    },
  };

  // Extract metadata
  const title = `${data?.item?.title} | Case Studies by Eric Njanga.`;
  const description = `${data?.item?.blurb} | Case studies on performance-focused UX and front-end strategy by Eric Njanga.`;
 
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
  const post = await fetchBlogPostBySlug(slug);
  const data: ContextType1 = {
    item: {
      sys: { id: post?.id },
      slug: post?.slug,
      title: post?.title,
      blurb: post?.blurb,
      description: post?.description,
    },
  };

  return <PageEntry {...data} />;
}