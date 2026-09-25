// @vitest-environment node
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { getSiteSettings } from '../fetching/getSiteSettings';
import { getCaseStudy } from '../fetching/getCaseStudies';
import { siteSettingsFallback } from '../fallbacks';

vi.hoisted(() => {
  process.env.CONTENTFUL_SPACE_ID = 'test-space';
  process.env.CONTENTFUL_DELIVERY_TOKEN = 'test-token';
});
vi.mock('server-only', () => ({}));
const fetchMock = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal('fetch', fetchMock);
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  fetchMock.mockReset();
});

it.each(['network', 'http', 'timeout'])('uses complete local settings after exhausted %s failures', async kind => {
  if (kind === 'network') {
    fetchMock.mockRejectedValue(Object.assign(new TypeError('fetch failed'), { cause: { code: 'ECONNRESET' } }));
  } else if (kind === 'http') {
    fetchMock.mockImplementation(() => Promise.resolve(new Response('Unavailable', { status: 503 })));
  } else {
    fetchMock.mockImplementation((_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')));
    }));
  }
  const result = getSiteSettings();
  await vi.runAllTimersAsync();
  expect(await result).toEqual(siteSettingsFallback);
  expect(fetchMock).toHaveBeenCalledTimes(3);
  expect(console.warn).toHaveBeenCalledWith('[Contentful] using local site settings after temporary failure');
});

it.each([401, 403])('preserves HTTP %s configuration failures', async status => {
  fetchMock.mockResolvedValue(new Response('Denied', { status }));
  await expect(getSiteSettings()).rejects.toThrow(`HTTP ${status}`);
  expect(console.warn).not.toHaveBeenCalled();
});

it('preserves GraphQL errors', async () => {
  fetchMock.mockResolvedValue(new Response(JSON.stringify({ errors: [{ message: 'Invalid query' }] })));
  await expect(getSiteSettings()).rejects.toThrow('GraphQL errors');
  expect(console.warn).not.toHaveBeenCalled();
});

it('uses CMS settings again when the service recovers', async () => {
  fetchMock.mockImplementation(() => Promise.resolve(new Response('Unavailable', { status: 503 })));
  const first = getSiteSettings();
  await vi.runAllTimersAsync();
  expect(await first).toEqual(siteSettingsFallback);
  fetchMock.mockResolvedValue(new Response(JSON.stringify({ data: { siteSettingsCollection: { items: [{ siteName: 'Recovered CMS' }] } } })));
  expect((await getSiteSettings()).siteName).toBe('Recovered CMS');
});

it('still throws for essential case-study content during an outage', async () => {
  fetchMock.mockImplementation(() => Promise.resolve(new Response('Unavailable', { status: 503 })));
  const assertion = expect(getCaseStudy('example')).rejects.toThrow('HTTP 503');
  await vi.runAllTimersAsync();
  await assertion;
  expect(console.warn).not.toHaveBeenCalled();
});
