/**
 * This eliminates the duplicated environment, endpoint, authorization, parsing, and error logic in every fetcher.
 * ------------------------------
 */
import 'server-only';

import type { ExecutionResult } from 'graphql';
import type { TypedDocumentString } from '../generated/graphql';

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environment = process.env.CONTENTFUL_ENVIRONMENT ?? 'master';
const deliveryToken = process.env.CONTENTFUL_DELIVERY_TOKEN;

if (!spaceId || !deliveryToken) {
  throw new Error('Contentful environment variables are not set.');
}

const endpoint =
  `https://graphql.contentful.com/content/v1/spaces/${spaceId}` +
  `/environments/${environment}`;

export async function execute<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  variables: TVariables
): Promise<TResult> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${deliveryToken}`,
    },
    body: JSON.stringify({
      query: document.toString(),
      variables,
    }),
    next: {
      revalidate: 300,
    },
  });

  const result =
    (await response.json()) as ExecutionResult<TResult>;

  if (!response.ok || result.errors?.length) {
    const details =
      result.errors?.map(({ message }) => message).join(', ') ||
      `HTTP ${response.status}`;

    throw new Error(`Contentful request failed: ${details}`);
  }

  if (!result.data) {
    throw new Error('Contentful returned no data.');
  }

  return result.data;
}















