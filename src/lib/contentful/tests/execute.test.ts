// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { TypedDocumentString } from '../generated/graphql';
import { execute } from '../client/execute';

vi.hoisted(() => { process.env.CONTENTFUL_SPACE_ID = 'test-space'; process.env.CONTENTFUL_DELIVERY_TOKEN = 'test-token'; });
vi.mock('server-only', () => ({}));
const query = new TypedDocumentString<{ ok: boolean }, Record<string, never>>('query Example { ok }', {});
const good = () => new Response(JSON.stringify({ data: { ok: true } }));
const dns = () => Object.assign(new TypeError('fetch failed'), { cause: { code: 'ENOTFOUND' } });
const fetchMock = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('fetch', fetchMock);
  vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); fetchMock.mockReset(); });

it('recovers from a DNS failure, preserving cache settings', async () => {
  fetchMock.mockRejectedValueOnce(dns()).mockResolvedValueOnce(good());
  const result = execute(query, {});
  await vi.runAllTimersAsync();
  expect(await result).toEqual({ ok: true });
  expect(fetchMock).toHaveBeenCalledTimes(2);
  expect(fetchMock.mock.calls[1][1].next).toEqual({ revalidate: 300 });
  expect(vi.getTimerCount()).toBe(0);
});

it('stops after three network failures and preserves the cause', async () => {
  const error = dns();
  fetchMock.mockRejectedValue(error);
  const assertion = expect(execute(query, {})).rejects.toBe(error);
  await vi.runAllTimersAsync();
  await assertion;
  expect(fetchMock).toHaveBeenCalledTimes(3);
  expect(vi.getTimerCount()).toBe(0);
});

it('retries temporary HTTP failures even when their body is not JSON', async () => {
  fetchMock.mockResolvedValueOnce(new Response('Unavailable', { status: 503 })).mockResolvedValueOnce(good());
  const result = execute(query, {});
  await vi.runAllTimersAsync();
  expect(await result).toEqual({ ok: true });
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

it.each([401, 403, 404])('does not retry HTTP %s', async status => {
  fetchMock.mockResolvedValue(new Response('Denied', { status }));
  await expect(execute(query, {})).rejects.toThrow(`HTTP ${status}`);
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

it('does not retry GraphQL errors or expose their contents in diagnostics', async () => {
  fetchMock.mockResolvedValue(new Response(JSON.stringify({ errors: [{ message: 'private content' }] })));
  await expect(execute(query, {})).rejects.toThrow('GraphQL errors');
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain('private content');
});

it('does not retry mutations', async () => {
  fetchMock.mockRejectedValue(dns());
  await expect(execute(new TypedDocumentString('mutation Save { save }', {}), {})).rejects.toThrow('fetch failed');
  expect(fetchMock).toHaveBeenCalledTimes(1);
});

it('aborts stalled requests and exhausts the bounded timeout budget', async () => {
  fetchMock.mockImplementation((_url, { signal }) => new Promise((_resolve, reject) => {
    signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
  }));
  const assertion = expect(execute(query, {})).rejects.toThrow('Aborted');
  await vi.advanceTimersByTimeAsync(12750);
  await assertion;
  expect(fetchMock).toHaveBeenCalledTimes(3);
  expect(vi.getTimerCount()).toBe(0);
});
