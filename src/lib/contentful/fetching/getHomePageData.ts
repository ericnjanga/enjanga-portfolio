import { homePageQuery } from '../queries';
import type { ContentfulHomePageResponse } from '../contentful-types';
import type { ExpertiseItemData, HomePageData } from '../models';
import { homePageFallback } from './fallbacks';
import { getFilteredExpertiseItems, getFilteredAboutSection } from '../transformations';

export default async function getHomePageData(
  slug: string = '/'
): Promise<HomePageData> {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environment = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';
  const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;

  if (!spaceId || !environment || !deliveryToken) {
    throw new Error('Contentful environment variables are not set.');
  }

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${spaceId}/environments/${environment}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${deliveryToken}`,
      },
      body: JSON.stringify({
        query: homePageQuery,
        variables: {
          slug: slug,
        },
      }), // Replace with your actual GraphQL query

      // Refresh Contentful content at most every 5 minutes (300 seconds)
      next: { revalidate: 300 },
    }
  );

  const result: ContentfulHomePageResponse = await response.json();

  if (!response.ok || result.errors?.length) {
    const details =
      result.errors?.map(({ message }) => message).join(', ') ||
      `HTTP ${response.status}`;

    throw new Error(`Contentful request failed: ${details}`);
  }

  const data = result?.data?.homePageCollection?.items[0];

  
  return {
    seoTitle: data?.seoTitle ?? homePageFallback.seoTitle,
    seoDescription: data?.seoDescription ?? homePageFallback.seoDescription,
    hero: {
      title: data?.hero?.title ?? homePageFallback.hero.title,
      subtitle: data?.hero?.subtitle ?? homePageFallback.hero.subtitle,
    },
    expertiseSection: { 
      title: data?.expertiseSection?.title ?? homePageFallback.expertiseSection.title, 
      expertiseItemsCollection: {
        items: getFilteredExpertiseItems(data?.expertiseSection?.expertiseItemsCollection?.items) ?? [...homePageFallback.expertiseSection.expertiseItemsCollection.items] as ExpertiseItemData[],
      }
    },
    aboutSection: getFilteredAboutSection(data?.aboutSection) ?? homePageFallback.aboutSection, 
  };
}
