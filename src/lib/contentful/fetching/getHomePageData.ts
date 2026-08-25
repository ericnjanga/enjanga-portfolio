import 'server-only';

import { HomePageDocument } from '../generated/graphql';
import { execute } from '../client/execute'; 
import type { ExpertiseItemData, HomePageData } from '../models';
import { homePageFallback } from '../fallbacks';
import { normalizeExpertiseSectionFields, normalizeAboutSection } from '../transformations';

export default async function getHomePageData(
  slug: string = '/'
) {
  const result = await execute(HomePageDocument, { slug }); 

  // ...
  const page = result?.homePageCollection?.items[0];
  const pageAboutSection = page?.aboutSection?.__typename === 'ContentSection' ? page?.aboutSection : null;
  const pageExpertiseSection = page?.expertiseSection?.__typename === 'ExpertiseSection' ? page.expertiseSection : null;

  return {
    seoTitle: page?.seoTitle ?? homePageFallback.seoTitle,
    seoDescription: page?.seoDescription ?? homePageFallback.seoDescription,
    hero: {
      title: page?.hero?.__typename === 'Hero' ? page.hero.title : homePageFallback.hero.title,
      subtitle: page?.hero?.__typename === 'Hero' ? page.hero.subtitle : homePageFallback.hero.subtitle,
    },
    expertiseSection: normalizeExpertiseSectionFields(pageExpertiseSection) ?? pageExpertiseSection,
    aboutSection: normalizeAboutSection(pageAboutSection) ?? homePageFallback.aboutSection, 
  };
}
