import { useQuery } from '@tanstack/react-query';
import { contentfulDataQuery } from '@/libs/contentful/contentful-dataQuery';
import { normalizeContentfulResponse } from '@/libs/contentful/contentful-contentNormalizer';

export const useContentfulForClientEntries = ({
  query,
  variables,
  queryKey,
  infoTracking,
}: {
  query: string;
  variables?: Record<string, any>;
  queryKey: string;
  infoTracking: string;
}) => {
  return useQuery({
    queryKey: [queryKey, variables],
    queryFn: async () => {
      const rawData = await contentfulDataQuery({ query, variables, infoTracking });
      return normalizeContentfulResponse(rawData);
    },
  });
};
