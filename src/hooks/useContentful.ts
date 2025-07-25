import { useQuery } from '@tanstack/react-query';
import { contentfulDataQuery } from '../libs/contentfulDataQuery';

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
    queryFn: () => contentfulDataQuery({ query, variables, infoTracking }),
  });
};
