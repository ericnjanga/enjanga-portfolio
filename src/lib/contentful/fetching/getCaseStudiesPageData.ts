import 'server-only';

import { cache } from 'react';
import { CaseStudiesPageDocument } from '../generated/graphql';
import { execute } from '../client/execute';
import type { CaseStudiesPageData } from '../models';
import { caseStudiesPageFallback } from '../fallbacks';
import { getCaseStudies } from './getCaseStudies';

export default cache(async function getCaseStudiesPageData(
  slug: string
): Promise<CaseStudiesPageData> {
  const [result, caseStudies] = await Promise.all([
    execute(CaseStudiesPageDocument, { slug }),
    getCaseStudies(),
  ]);
  const page = result?.caseStudiesPageCollection?.items[0];

  return {
    seoTitle: page?.seoTitle ?? caseStudiesPageFallback.seoTitle,
    seoDescription:
      page?.seoDescription ?? caseStudiesPageFallback.seoDescription,
    hero: {
      title: page?.hero?.title ?? caseStudiesPageFallback.hero.title,
      subtitle: page?.hero?.subtitle ?? caseStudiesPageFallback.hero.subtitle,
    },
    caseStudies,
  };
});
