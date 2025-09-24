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
   * Test ...
   */
  it('Returns a "Collection of Blog Posts" as expected', async () => {
    // Mock GraphQL response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => blogPostsFixture,
    });

    const result = await fetchEntriesDirect('Collection of Blog Posts');

    expect(result).toEqual(blogPostsFixture.data.en.items);
  });



  /**
   * Test ...
   */
  it('Returns a "Single Blog Entry" into an array', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => singleBlogPostFixture,
    });

    const result = await fetchEntriesDirect('Single Blog Entry');

    expect(result).toEqual([singleBlogPostFixture.data.en]);
  });



  /**
   * Test ...
   */
  it('throws if fetch fails', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      statusText: 'Unauthorized',
    });

    await expect(fetchEntriesDirect('Collection of Blog Posts')).rejects.toThrow(
      'Contentful fetch failed: Unauthorized'
    );
  });



});
