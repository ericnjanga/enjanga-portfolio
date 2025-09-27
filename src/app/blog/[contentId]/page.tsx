// src/app/blog/[contentId]/page.tsx  (server component by default)
import { generateParamsForContent } from '@/libs/generateStaticParams';
import BlogArticlePage from './BlogArticlePage';

/*
 * This function tells Next.js which dynamic routes to pre-render at build time
 * when running in static export mode (output: "export").
 * It calls our shared utility (generateParamsForContent) to fetch all blog posts
 * from Contentful, then returns their IDs as route params.
 * Example: if Contentful has posts with sys.id = "abc" and "xyz",
 * Next.js will generate /blog/abc and /blog/xyz as static pages.
*/
export async function generateStaticParams() {
  return generateParamsForContent('Blog Post Collection');
}

export default function Page({ params }: { params: { contentId: string } }) {
  return <BlogArticlePage params={params} />;
}
