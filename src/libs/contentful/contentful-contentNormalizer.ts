// src/libs/contentful-contentNormalizer.ts

/**
 * This function takes the raw GraphQL response (whether from server or client) and returns a consistent shape (e.g. array of { sys, title, ... }).
 * NOTE: Always returns a array. Either empty, or containing objects
 * @param data 
 * @returns 
 */
export function normalizeContentfulResponse(data: any) { 

  // Always try to get items under `en.items`
  if (data?.en?.items) {
    return data.en.items; // items is an array
  }

  // If it’s a single entry under `data.en`
  if (data?.en && !data.en.items) {
    return [data.en];
  }

  return [];
}
