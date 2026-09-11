import 'server-only';

import { cache } from 'react';
import { HomePageDocument } from '../generated/graphql';
import { execute } from '../client/execute';
import type { HomePageData } from '../models';
import { homePageFallback } from '../fallbacks';
import {
  normalizeHomePageExpertiseSectionFields,
  normalizeHomePageAboutSection,
  normalizeHomePageHeroFields,
} from '../transformations';

export default cache(async function getHomePageData(
  slug: string = '/'
): Promise<HomePageData> {
  const result = await execute(HomePageDocument, { slug });

  // ...
  const page = result?.homePageCollection?.items[0];
  const pageHero = page?.hero?.__typename === 'Hero' ? page?.hero : null;
  const pageAboutSection =
    page?.aboutSection?.__typename === 'ContentSection'
      ? page?.aboutSection
      : null;
  const pageExpertiseSection =
    page?.expertiseSection?.__typename === 'ExpertiseSection'
      ? page.expertiseSection
      : null;

  return {
    seoTitle: page?.seoTitle ?? homePageFallback.seoTitle,
    seoDescription: page?.seoDescription ?? homePageFallback.seoDescription,
    hero: normalizeHomePageHeroFields(pageHero),
    expertiseSection:
      normalizeHomePageExpertiseSectionFields(pageExpertiseSection),
    aboutSection:
      normalizeHomePageAboutSection(pageAboutSection) ??
      homePageFallback.aboutSection,
  };
});
