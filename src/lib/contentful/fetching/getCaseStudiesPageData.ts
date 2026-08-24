import 'server-only';

import { CaseStudiesPageDocument } from '../generated/graphql';
import { execute } from '../client/execute'; 
 
import type { CaseStudiesPageData } from "../models";
import { caseStudiesPageFallback } from '../fallbacks';


export default async function getCaseStudiesPageData(slug: string) { 
  const result = await execute(CaseStudiesPageDocument, { slug }); 

  const page = result?.caseStudiesPageCollection?.items[0];

  return {
    seoTitle: page?.seoTitle ?? caseStudiesPageFallback.seoTitle,
    seoDescription: page?.seoDescription ?? caseStudiesPageFallback.seoDescription,
    hero: {
      title: page?.hero?.title ?? caseStudiesPageFallback.hero.title,
      subtitle: page?.hero?.subtitle ?? caseStudiesPageFallback.hero.subtitle,
    },
  }
}