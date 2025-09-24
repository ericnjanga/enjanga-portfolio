// tests/fetchEntriesDirect.test.ts
import { vi, describe, it, expect } from 'vitest';
import { fetchEntriesDirect } from '@/libs/fetchEntries';

// blogPostsFixture is a saved JSON response from the real Contentful GraphQL API.
// It represents the shape of data returned for blogPostCollection queries,
// and is used in tests to ensure our code works with actual API structures.
import blogPostsFixture from './fixtures/blogPosts.fixture.json';
import singleBlogPostFixture from './fixtures/singleBlogPost.fixture.json';


describe('fetchEntriesDirect', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  /**
   * Making sure normalized items are returned from the query
   */
  it('returns normalized items from a collection query', async () => {
    // Mock GraphQL response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => blogPostsFixture,
    });

    const result = await fetchEntriesDirect('List of Blog Posts');

    expect(result).toEqual(blogPostsFixture.data.en.items);
  });




  it('wraps a single entry into an array', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => singleBlogPostFixture,
    });

    const result = await fetchEntriesDirect('Single Blog Post');

    expect(result).toEqual(singleBlogPostFixture.data.en  );
  });




  // it('throws if fetch fails', async () => {
  //   (global.fetch as any).mockResolvedValueOnce({
  //     ok: false,
  //     statusText: 'Unauthorized',
  //   });

  //   await expect(fetchEntriesDirect('List of Blog Posts')).rejects.toThrow(
  //     'Contentful fetch failed: Unauthorized'
  //   );
  // });



});
