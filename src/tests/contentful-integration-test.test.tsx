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

import bannerHomePageEntryFixture from './fixtures/bannerHomePageEntry.fixture.json';
import bannerBlogPageEntryFixture from './fixtures/bannerBlogPageEntry.fixture.json';
import footerCopyrightEntryFixture from './fixtures/footerCopyrightEntry.fixture.json';
import caseStudyEntryFixture from './fixtures/caseStudyEntry.fixture.json';

import scopeOfExpCollectionFixture from './fixtures/scopeOfExpCollection.fixture.json';
import scopeOfExpCollectionEntryFixture from './fixtures/scopeOfExpCollectionEntry.fixture.json';

import blogPostCollectionFixture from './fixtures/blogPostCollection.fixture.json';
import blogPostsEntryFixture from './fixtures/blogPostEntry.fixture.json';
import aboutInfoCollectionFixture from './fixtures/aboutInfoCollection.fixture.json';
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
    const landingPageBannerId = contentfulContentIds.categories['BannerHomePage Entry'];
    const blogPageBannerId = contentfulContentIds.categories['BannerBlogPage Entry'];
    const footerCopyrightId = contentfulContentIds.categories['FooterCopyright Entry'];
    const scopeOfExpCollRefId = contentfulContentIds.categories['scopeOfExp Parent Entry Collection'];
    const footerLinksCollRefId = contentfulContentIds.categories['FooterLinks Entry Collection'];
    const caseStudyEntryId = '2UJqmr6lFkc80z1Qm3LUfr';
    const scopeOfExpCollEntryId = '6Y19zH13dUQ6mRHnNSdJGY';
    const caseStudyCollRefId = '5y2JSha3mykWdGkUf6XcQp';





    it(`["BannerHomePage Entry"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'BannerHomePage Entry',
        landingPageBannerId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('BannerHomePage Entry', landingPageBannerId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual([bannerHomePageEntryFixture.data.en]);
    });


    it(`["BannerBlogPage Entry"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'BannerBlogPage Entry',
        blogPageBannerId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('BannerBlogPage Entry', blogPageBannerId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual([bannerBlogPageEntryFixture.data.en]);
    });


    it(`["FooterCopyright Entry"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'FooterCopyright Entry',
        footerCopyrightId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('FooterCopyright Entry', footerCopyrightId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual([footerCopyrightEntryFixture.data.en]);
    });
 

    it(`["CaseStudy Entry"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'CaseStudy Entry',
        caseStudyEntryId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('CaseStudy Entry', caseStudyEntryId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual([caseStudyEntryFixture.data.en]);
    });



    it(`["scopeOfExp Parent Entry Collection"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'scopeOfExp Parent Entry Collection',
        scopeOfExpCollRefId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('scopeOfExp Parent Entry Collection', scopeOfExpCollRefId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual(scopeOfExpCollectionFixture.data.en.items);
    });



    it(`["scopeOfExp Entry Collection"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'scopeOfExp Entry Collection',
        scopeOfExpCollEntryId
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('scopeOfExp Entry Collection', scopeOfExpCollEntryId),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual(scopeOfExpCollectionEntryFixture.data.en.items);
    });



    it(`["AboutInfo Entry Collection"] fetches the same normalized data (server + client)`, async () => {
      const serverResult = await contentfulForServerEntriesFetch(
        'AboutInfo Entry Collection'
      );
      expect(serverResult.length).toBeGreaterThan(0);

      const { result } = renderHook(
        () => useContentfulForClientEntries('AboutInfo Entry Collection'),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      const clientResult = result.current.data;
      expect(serverResult).toEqual(clientResult);
      expect(serverResult).toEqual(aboutInfoCollectionFixture.data.en.items);
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
    



    // it(`["BlogPost Entry Collection"] fetches the same normalized data (server + client)`, async () => {
    //   const serverResult = await contentfulForServerEntriesFetch(
    //     'BlogPost Entry Collection'
    //   );
    //   expect(serverResult.length).toBeGreaterThan(0);

    //   const { result } = renderHook(
    //     () => useContentfulForClientEntries('BlogPost Entry Collection'),
    //     { wrapper: createWrapper() }
    //   );

    //   await waitFor(() => {
    //     expect(result.current.isSuccess).toBe(true);
    //   });

    //   const clientResult = result.current.data;
    //   expect(serverResult).toEqual(clientResult);
    //   expect(serverResult).toEqual(blogPostCollectionFixture.data.en.items);
    // });



    // it(`["CaseStudy Entry Collection"] fetches the same normalized data (server + client)`, async () => {
    //   const serverResult = await contentfulForServerEntriesFetch(
    //     'CaseStudy Entry Collection',
    //     caseStudyCollRefId
    //   );
    //   expect(serverResult.length).toBeGreaterThan(0);

    //   const { result } = renderHook(
    //     () => useContentfulForClientEntries('CaseStudy Entry Collection', caseStudyCollRefId),
    //     { wrapper: createWrapper() }
    //   );

    //   await waitFor(() => {
    //     expect(result.current.isSuccess).toBe(true);
    //   });

    //   const clientResult = result.current.data;
    //   expect(serverResult).toEqual(clientResult);
    //   expect(serverResult).toEqual(caseStudyCollectionFixture.data.en.items);
    // });



    // it(`["FooterLinks Entry Collection"] fetches the same normalized data (server + client)`, async () => {
    //   const serverResult = await contentfulForServerEntriesFetch(
    //     'FooterLinks Entry Collection',
    //     footerLinksCollRefId
    //   );
    //   expect(serverResult.length).toBeGreaterThan(0);

    //   const { result } = renderHook(
    //     () => useContentfulForClientEntries('FooterLinks Entry Collection', footerLinksCollRefId),
    //     { wrapper: createWrapper() }
    //   );

    //   await waitFor(() => {
    //     expect(result.current.isSuccess).toBe(true);
    //   });

    //   const clientResult = result.current.data;
    //   expect(serverResult).toEqual(clientResult);
    //   expect(serverResult).toEqual(footerLinksCollectionFixture.data.en.items);
    // });



    // it(`["BlogPost Entry"] fetches the same normalized data (server + client)`, async () => {
    //   const serverResult = await contentfulForServerEntriesFetch(
    //     'BlogPost Entry',
    //     blogEntryId
    //   );
    //   expect(serverResult.length).toBeGreaterThan(0);

    //   const { result } = renderHook(
    //     () => useContentfulForClientEntries('BlogPost Entry', blogEntryId),
    //     { wrapper: createWrapper() }
    //   );

    //   await waitFor(() => {
    //     expect(result.current.isSuccess).toBe(true);
    //   });

    //   const clientResult = result.current.data;
    //   expect(serverResult).toEqual(clientResult);
    //   expect(serverResult).toEqual([blogPostsEntryFixture.data.en]);
    // });



  }
);
