import { useQuery } from '@tanstack/react-query';
import { contentfulDataQuery } from '@/libs/contentfulDataQuery';
import { normalizeContentfulResponse } from '@/libs/contentfulNormalizer';

export const useContentful = ({
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
