/**
 * This eliminates the duplicated environment, endpoint, authorization, parsing, and error logic in every fetcher.
 * ------------------------------
 */
import 'server-only';

import { getOperationAST, parse, type ExecutionResult } from 'graphql';
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

const RETRYABLE_CODES = new Set([
  'ENOTFOUND', 'EAI_AGAIN', 'ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT',
  'UND_ERR_CONNECT_TIMEOUT', 'UND_ERR_HEADERS_TIMEOUT', 'UND_ERR_BODY_TIMEOUT',
  'UND_ERR_SOCKET',
]);
const RETRYABLE_STATUS = new Set([500, 502, 503, 504]);
const ATTEMPT_TIMEOUT_MS = 4000;
const RETRY_DELAYS_MS = [250, 500];

class TemporaryHttpError extends Error {
  constructor(readonly status: number) { super(`Contentful HTTP ${status}`); }
}

function networkCode(error: unknown): string | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const value = error as { code?: string; cause?: { code?: string } };
  return value.cause?.code ?? value.code;
}

/** Retry read-only queries only; keep the existing five-minute data cache. */
export async function execute<TResult, TVariables>(
  document: TypedDocumentString<TResult, TVariables>,
  variables: TVariables
): Promise<TResult> {
  const query = document.toString();
  const operation = getOperationAST(parse(query));
  const attempts = operation?.operation === 'query' ? 3 : 1;
  const name = operation?.name?.value ?? 'anonymous';
  const debug = process.env.NODE_ENV === 'development';

  for (let attempt = 1; attempt <= attempts; attempt++) {
    const controller = new AbortController();
    // Covers receiving the response body as well as connecting to Contentful.
    const timeout = setTimeout(() => controller.abort(), ATTEMPT_TIMEOUT_MS);
    const startedAt = performance.now();
    let retry = false;
    try {
      if (debug) console.info('[Contentful] fetch starting', {
        operation: name, attempt, time: new Date().toISOString(),
      });
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${deliveryToken}`,
        },
        body: JSON.stringify({ query, variables }),
        next: { revalidate: 300 },
        signal: controller.signal,
      });
      if (!response.ok) {
        // Release the body before retrying; error pages may not contain JSON.
        await response.body?.cancel();
        if (RETRYABLE_STATUS.has(response.status)) throw new TemporaryHttpError(response.status);
        throw new Error(`Contentful request failed: HTTP ${response.status}`);
      }
      const result = await response.json() as ExecutionResult<TResult>;
      if (result.errors?.length) throw new Error('Contentful returned GraphQL errors.');
      if (result.data == null) throw new Error('Contentful returned no data.');
      if (debug) console.info('[Contentful] fetch completed', {
        operation: name, attempt, status: response.status,
        durationMs: Math.round(performance.now() - startedAt),
      });
      return result.data;
    } catch (error) {
      const code = networkCode(error);
      const temporary = controller.signal.aborted || error instanceof TemporaryHttpError ||
        (code !== undefined && RETRYABLE_CODES.has(code));
      retry = temporary && attempt < attempts;
      // Preserve diagnostics without logging credentials, variables, or CMS content.
      console.error('[Contentful] request failed', {
        operation: name, attempt, retry,
        code: controller.signal.aborted ? 'TIMEOUT' : code,
        status: error instanceof TemporaryHttpError ? error.status : undefined,
      });
      if (!retry) throw error;
    } finally {
      clearTimeout(timeout);
    }
    if (retry) await new Promise(resolve => setTimeout(resolve, RETRY_DELAYS_MS[attempt - 1]));
  }
  throw new Error('Contentful request failed.');
}
