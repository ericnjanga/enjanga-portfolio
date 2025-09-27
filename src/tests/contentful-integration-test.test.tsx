


// -----------------------------------------------------------------------------
// INTEGRATION TESTS (real Contentful calls)
// Run only if RUN_INTEGRATION_TESTS=true is set
// -----------------------------------------------------------------------------

// tests/contentful-integration-test.test.tsx
import React from 'react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { contentfulForServerEntriesFetch } from '@/libs/contentful/contentful-forServerFetchEntries';
import { useContentfulForClientEntries } from '@/libs/contentful/hooks/useContentfulForClientEntries';
import blogPostCollectionFixture from './fixtures/blogPostCollection.fixture.json';
import blogPostsEntryFixture from './fixtures/blogPostEntry.fixture.json';




// Helpers
// -----------------------------------------------------------------------------

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
 



// Tests
// -----------------------------------------------------------------------------
describe.runIf(process.env.RUN_INTEGRATION_TESTS === 'true')(
  'Contentful client/server consistency (integration)',
  () => {
    // ...
    const blogEntryId = '19oHD8PCWxtpsAQ0vrZm80';

    it(`["Blog Post Collection"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Blog Post Collection'
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Blog Post Collection'),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual(blogPostCollectionFixture.data.en.items);
    });



    it(`["Blog Post Entry"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Blog Post Entry',
        blogEntryId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Blog Post Entry', blogEntryId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual([blogPostsEntryFixture.data.en]);
    });
  }
);
