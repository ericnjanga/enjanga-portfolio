import 'server-only';

import { cache } from 'react';
import { execute } from '../client/execute';
import { CaseStudiesDocument, CaseStudyDocument } from '../generated/graphql';
import type { CaseStudySummaryData } from '../models';

export const getCaseStudies = cache(
  async (): Promise<CaseStudySummaryData[]> => {
    const studies: CaseStudySummaryData[] = [];
    const limit = 100;
    let skip = 0;
    let total = 0;

    do {
      const result = await execute(CaseStudiesDocument, { skip, limit });
      const collection = result.blogPostCollection;
      total = collection?.total ?? 0;
      for (const item of collection?.items ?? []) {
        if (!item?.title || !item.slug) continue;
        studies.push({
          id: item.sys.id,
          title: item.title,
          slug: item.slug,
          summary: item.blurb ?? '',
          image: item.introVideoImage?.url
            ? {
                url: item.introVideoImage.url,
                width: item.introVideoImage.width ?? 489,
                height: item.introVideoImage.height ?? 469,
                description: item.introVideoImage.description ?? '',
              }
            : null,
          video: item.introVideo?.url
            ? {
                url: item.introVideo.url,
                contentType: item.introVideo.contentType ?? 'video/mp4',
              }
            : null,
        });
      }
      skip += limit;
    } while (skip < total);

    return studies;
  }
);

export const getCaseStudy = cache(async (slug: string) => {
  const result = await execute(CaseStudyDocument, { slug });
  return result.blogPostCollection?.items[0] ?? null;
});
