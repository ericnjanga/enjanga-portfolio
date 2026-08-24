import 'server-only';

import { HomePageDocument } from '../generated/graphql';
import { execute } from '../client/execute'; 
import type { ExpertiseItemData, HomePageData } from '../models';
import { homePageFallback } from '../fallbacks';
import { normalizeExpertiseItems, normalizeAboutSection } from '../transformations';

export default async function getHomePageData(
  slug: string = '/'
) {
  const result = await execute(HomePageDocument, { slug }); 

  const page = result?.homePageCollection?.items[0];

  return {
    seoTitle: page?.seoTitle ?? homePageFallback.seoTitle,
    seoDescription: page?.seoDescription ?? homePageFallback.seoDescription,
    hero: {
      title: page?.hero?.title ?? homePageFallback.hero.title,
      subtitle: page?.hero?.subtitle ?? homePageFallback.hero.subtitle,
    },
    expertiseSection: { 
      title: page?.expertiseSection?.title ?? homePageFallback.expertiseSection.title, 
      expertiseItemsCollection: {
        items: normalizeExpertiseItems(page?.expertiseSection?.expertiseItemsCollection?.items) ?? [...homePageFallback.expertiseSection.expertiseItemsCollection.items] as ExpertiseItemData[],
      }
    },
    aboutSection: normalizeAboutSection(page?.aboutSection) ?? homePageFallback.aboutSection, 
  };
}
