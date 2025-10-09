
// // tests/contentful-forServerFetchEntries.test.ts
// import React from 'react';
// import { vi, describe, it, expect, beforeEach } from 'vitest';
// import { renderHook, waitFor } from '@testing-library/react';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { contentfulForServerEntriesFetch } from '@/libs/contentful/contentful-forServerFetchEntries';
// import { useContentfulForClientEntries } from '@/libs/contentful/hooks/useContentfulForClientEntries';

// // blogPostCollectionFixture is a saved JSON response from the real Contentful GraphQL API.
// // It represents the shape of data returned for blogPostCollection queries,
// // and is used in tests to ensure our code works with actual API structures.
// import blogPostCollectionFixture from './fixtures/blogPosts.fixture.json';


// // 🔥 Tell Vitest to mock the module, but don’t use blogPostCollectionFixture here
// vi.mock('@/libs/contentful/contentful-dataQuery', () => ({
//   contentfulDataQuery: vi.fn(),
// }));

// import { contentfulDataQuery } from '@/libs/contentful/contentful-dataQuery';

// // Mock fetch globally for server-side function
// beforeEach(() => {
//   global.fetch = vi.fn().mockResolvedValue({
//     ok: true,
//     json: async () => ({ data: blogPostCollectionFixture }),
//   }) as any;
// });

// // Create wrapper with QueryClientProvider for React Query hooks
// const createWrapper = () => {
//   const queryClient = new QueryClient();
//   return ({ children }: { children: React.ReactNode }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };

// describe('Contentful client/server consistency', () => {
//   it(`Returns the same normalized array of ["BlogPost Entry Collection"] for server and client fetch`, async () => {
//     // Server-side call
//     const serverResult = await contentfulForServerEntriesFetch('BlogPost Entry Collection');

//     // // Client-side hook (React Query)
//     // const { result } = renderHook(
//     //   () => useContentfulForClientEntries('BlogPost Entry Collection'),
//     //   { wrapper: createWrapper() }
//     // );

//     // await waitFor(() => {
//     //   expect(result.current.isSuccess).toBe(true);
//     // });

//     // const clientResult = result.current.data;

//     // Compare results
//     // expect(serverResult).toEqual(clientResult); // consistency
//     // expect(serverResult).toEqual(blogPostCollectionFixture.data.en.items); // matches fixture
//   });
// });





// -----------------------------------------------------------------------------
// UNIT TESTS (mocked, fast, deterministic)
// -----------------------------------------------------------------------------

// describe('Contentful client/server consistency (unit tests)', () => {
//   beforeEach(() => {
//     // Mock global fetch for server-side function
//     global.fetch = vi.fn().mockResolvedValue({
//       ok: true,
//       json: async () => ({ data: blogPostCollectionFixture }),
//     }) as any;
//   });

//   it('returns the same normalized array for server and client fetch (mocked)', async () => {
//     const serverResult = await contentfulForServerEntriesFetch(
//       'BlogPost Entry Collection'
//     );

//     const { result } = renderHook(
//       () => useContentfulForClientEntries('BlogPost Entry Collection'),
//       { wrapper: createWrapper() }
//     );

//     await waitFor(() => {
//       expect(result.current.isSuccess).toBe(true);
//     });

//     const clientResult = result.current.data;

//     expect(serverResult).toEqual(clientResult); // consistency
//     expect(serverResult).toEqual(blogPostCollectionFixture.data.en.items); // matches fixture
//   });
// });
