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
  return generateParamsForContent('Case Study Collection');
}


export default function Page({ params }: { params: { contentId: string } }) {
  return <ProjectPage params={params} />;
}