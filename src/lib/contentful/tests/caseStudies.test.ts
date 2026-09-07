import { afterEach, expect, test, vi } from 'vitest';
import { getCaseStudies } from '../fetching/getCaseStudies';
import { execute } from '../client/execute';

vi.mock('server-only', () => ({}));
vi.mock('../client/execute', () => ({ execute: vi.fn() }));

afterEach(() => vi.clearAllMocks());

test('fetches every page and handles missing media and unresolved entries', async () => {
  vi.mocked(execute)
    .mockResolvedValueOnce({
      blogPostCollection: {
        total: 101,
        items: [
          null,
          { sys: { id: 'no-slug' }, title: 'Incomplete' },
          {
            sys: { id: 'first' },
            title: 'First',
            slug: 'first',
            blurb: 'Summary',
          },
        ],
      },
    })
    .mockResolvedValueOnce({
      blogPostCollection: {
        total: 101,
        items: [
          {
            sys: { id: 'last' },
            title: 'Last',
            slug: 'last',
            introVideo: {
              url: 'https://example.com/video.mp4',
              contentType: 'video/mp4',
            },
          },
        ],
      },
    });

  const result = await getCaseStudies();
  expect(result.map((item) => item.id)).toEqual(['first', 'last']);
  expect(result[0]).toMatchObject({
    image: null,
    video: null,
    summary: 'Summary',
  });
  expect(result[1].video?.url).toBe('https://example.com/video.mp4');
  expect(execute).toHaveBeenNthCalledWith(2, expect.anything(), {
    skip: 100,
    limit: 100,
  });
});
