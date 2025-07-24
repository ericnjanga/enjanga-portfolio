import axios from 'axios';
import { getEnvVar } from '@utils/getEnv';

const SPACE_ID = getEnvVar('VITE_CONTENTFUL_SPACE_ID');
const ENVIRONMENT = getEnvVar('VITE_CONTENTFUL_ENVIRONMENT');
const ACCESS_TOKEN = getEnvVar('VITE_CONTENTFUL_ACCESS_TOKEN');

const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

export const contentfulFetcher_old = async ({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, any>;
}) => {
  const res = await axios.post(
    GRAPHQL_ENDPOINT,
    {
      query,
      variables,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return res.data.data;
};
