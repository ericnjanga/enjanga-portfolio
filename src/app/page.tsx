import type { Metadata } from 'next';
import HomePage from '@/components/Home/HomePage';
import getHomePageData from '@/lib/contentful/fetching/getHomePageData';

export async function generateMetadata(): Promise<Metadata> {
  const { seoTitle, seoDescription } = await getHomePageData('/');

  return { title: seoTitle, description: seoDescription };
}

export default async function Home() {
  const homePageData = await getHomePageData('/');

  return <HomePage data={homePageData} />;
}
