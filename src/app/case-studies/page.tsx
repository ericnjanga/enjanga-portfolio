import type { Metadata } from 'next';
import CaseStudiesPage from '@/components/CaseStudies/CaseStudiesPage';
import getCaseStudiesPageData from '@/lib/contentful/fetching/getCaseStudiesPageData';

export async function generateMetadata(): Promise<Metadata> {
  const { seoTitle, seoDescription } = await getCaseStudiesPageData(
    'case-studies'
  );
  return { title: seoTitle, description: seoDescription };
}

export default async function CaseStudies() {
  return (
    <CaseStudiesPage data={await getCaseStudiesPageData('case-studies')} />
  );
}
