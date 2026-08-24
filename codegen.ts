import { loadEnvConfig } from '@next/env';
import type { CodegenConfig } from '@graphql-codegen/cli';

loadEnvConfig(process.cwd());

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environment = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';
const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;

if (!spaceId || !deliveryToken) {
  throw new Error('Contentful codegen environment variables are not set.');
}

const endpoint =
  `https://graphql.contentful.com/content/v1/spaces/${spaceId}` +
  `/environments/${environment}`;

const config: CodegenConfig = {
  schema: [
    {
      [endpoint]: {
        headers: {
          Authorization: `Bearer ${deliveryToken}`,
        },
      },
    },
  ],

  documents: [
    'src/lib/contentful/queries/**/*.graphql',
    'src/lib/contentful/fragments/**/*.graphql',
  ],

  generates: {
    'src/lib/contentful/generated/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },

  ignoreNoDocuments: true,
};

export default config;