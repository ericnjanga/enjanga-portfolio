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
import { contentfulContentIds } from '@/libs/contentful/contentful-queryConfig';
import blogPostCollectionFixture from './fixtures/blogPostCollection.fixture.json';
import blogPostsEntryFixture from './fixtures/blogPostEntry.fixture.json';
import aboutInfoCollectionFixture from './fixtures/aboutInfoCollection.fixture.json';
import landingPageBannerFixture from './fixtures/landingPageBanner.fixture.json';
import blogPageBannerFixture from './fixtures/blogPageBanner.fixture.json';
import footerCopyrightFixture from './fixtures/footerCopyright.fixture.json';
import caseStudyEntryFixture from './fixtures/caseStudyEntry.fixture.json';
import scopeOfExpCollectionFixture from './fixtures/scopeOfExpCollection.fixture.json';
import scopeOfExpCollectionEntryFixture from './fixtures/scopeOfExpCollectionEntry.fixture.json';
import caseStudyCollectionFixture from './fixtures/caseStudyCollection.fixture.json';
import quoteEntryCollectionFixture from './fixtures/quoteEntryCollection.fixture.json';
import footerLinksCollectionFixture from './fixtures/footerLinksCollection.fixture.json';





// Helpers
// -----------------------------------------------------------------------------

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
 


// Tests:
// Making sure Contentful entries fetched for both server and client-side
// functions are consistent with entry fixtures.
// -----------------------------------------------------------------------------
describe.runIf(process.env.RUN_INTEGRATION_TESTS === 'true')(
  'Contentful client/server consistency (integration)',
  () => {
    // ...
    const blogEntryId = '19oHD8PCWxtpsAQ0vrZm80';
    const landingPageBannerId = contentfulContentIds.categories['Landing Page Banner'];
    const blogPageBannerId = contentfulContentIds.categories['Blog Page Banner'];
    const footerCopyrightId = contentfulContentIds.categories['Footer Copyright'];
    const scopeOfExpCollRefId = contentfulContentIds.categories['Scope of expertise Collection'];
    const footerLinksCollRefId = contentfulContentIds.categories['Footer Links Collection'];
    const caseStudyEntryId = '2UJqmr6lFkc80z1Qm3LUfr';
    const scopeOfExpCollEntryId = '6Y19zH13dUQ6mRHnNSdJGY';
    const caseStudyCollRefId = '5y2JSha3mykWdGkUf6XcQp';


 
    
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



    it(`["About Info Collection"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'About Info Collection'
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('About Info Collection'),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual(aboutInfoCollectionFixture.data.en.items);
    });



    it(`["Scope of expertise Collection"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Scope of expertise Collection',
        scopeOfExpCollRefId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Scope of expertise Collection', scopeOfExpCollRefId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual(scopeOfExpCollectionFixture.data.en.items);
    });



    it(`["Expertise Entry Collection"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Expertise Entry Collection',
        scopeOfExpCollEntryId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Expertise Entry Collection', scopeOfExpCollEntryId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual(scopeOfExpCollectionEntryFixture.data.en.items);
    });



    it(`["Case Study Collection"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Case Study Collection',
        caseStudyCollRefId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Case Study Collection', caseStudyCollRefId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual(caseStudyCollectionFixture.data.en.items);
    });



    it(`["Quotes Entry Collection"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Quotes Entry Collection'
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Quotes Entry Collection'),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual(quoteEntryCollectionFixture.data.en.items);
    });



    it(`["Footer Links Collection"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Footer Links Collection',
        footerLinksCollRefId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Footer Links Collection', footerLinksCollRefId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual(footerLinksCollectionFixture.data.en.items);
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



    it(`["Landing Page Banner"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Landing Page Banner',
        landingPageBannerId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Landing Page Banner', landingPageBannerId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual([landingPageBannerFixture.data.en]);
    });



    it(`["Blog Page Banner"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Blog Page Banner',
        blogPageBannerId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Blog Page Banner', blogPageBannerId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual([blogPageBannerFixture.data.en]);
    });



    it(`["Footer Copyright"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Footer Copyright',
        footerCopyrightId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Footer Copyright', footerCopyrightId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual([footerCopyrightFixture.data.en]);
    });



    it(`["Case Study Entry"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'Case Study Entry',
        caseStudyEntryId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('Case Study Entry', caseStudyEntryId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual([caseStudyEntryFixture.data.en]);
    });
  }
);
