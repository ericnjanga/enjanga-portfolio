import { useQuery } from '@tanstack/react-query';
import { contentfulDataQuery } from '@/libs/contentful/contentful-dataQuery';
import { normalizeContentfulResponse } from '@/libs/contentful/contentful-contentNormalizer';
import { getContentfulQueryConfig } from '../contentful-queryConfig';
import type { DataFor1, DataFor2, DataFor3, DataFor4, DataFor5 } from '../../../utils/dataProcessing/types';

/**
 * Direct client-side fetch to Contentful GraphQL API.
 * @param dataFor
 * @param contentId
 * @returns
 */
export const useContentfulForClientEntries = (
  dataFor: DataFor1 | DataFor2 | DataFor3 | DataFor4 | DataFor5,
  contentId?: string
) => {
  const { query, variables, trackingInfo } = getContentfulQueryConfig(dataFor, contentId);

  return useQuery({
    queryKey: [query, variables],
    queryFn: async () => {
      if (dataFor === 'CaseStudy Entry' || dataFor === 'CaseStudy Entry Collection') {
        // Temporarily disabled: model removed from Contentful.
        return [];
      }

      const rawData = await contentfulDataQuery({ query, variables, trackingInfo });
      return normalizeContentfulResponse(rawData);
    },
  });
};
