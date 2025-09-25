import axios from 'axios';

const SPACE_ID = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const ENVIRONMENT = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT}`;

export const contentfulDataQuery = async ({
  query,
  variables,
  infoTracking,
}: {
  query: string;
  variables?: Record<string, any>;
  infoTracking: string;
}) => {
  try {
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
  } catch (error) {
    console.error(`Error fetching "${infoTracking}": `, error);
    throw error;
  }
};
