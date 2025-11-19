import type { Metadata } from "next";
import { contentfulForServerEntriesFetch } from '@/libs/contentful/contentful-forServerFetchEntries';
import { contentfulContentIds } from '@/libs/contentful/contentful-queryConfig'; 


export type IncomingMetadataVal = {
  title: string;
  blurb: string;
};

export type MetadataValueType = {
  title: string;
  description: string;
  errorMsg?: string;
};


/**
 * Formatting and validating upcoming metadata values from ContentFul as well as handling potential errors
 * @param val 
 * @returns 
 */
export const formatAsMetadata = (val: IncomingMetadataVal[]): MetadataValueType => {
  // Default fallback values
  const defaultData: MetadataValueType = {
    title: 'Eric Njanga',
    description: 'Chief Software Engineer',
    errorMsg: '',
  };

  // Type guard to check if it's an array
  const isArray = (value: unknown): value is unknown[] => {
    return Array.isArray(value);
  };

  // Type guard to check if it has the expected structure
  const isValidMetadata = (item: unknown): item is IncomingMetadataVal => {
    return (
      typeof item === 'object' &&
      item !== null &&
      'title' in item &&
      'blurb' in item &&
      typeof (item as any).title === 'string' &&
      typeof (item as any).blurb === 'string'
    );
  };

  try {
    // Check if val is an array and has at least one item
    if (!isArray(val) || val.length === 0) {
      return {
        ...defaultData,
        errorMsg: 'No metadata entries found or invalid data structure',
      };
    }

    const firstItem = val[0];

    // Validate the structure of the first item
    if (!isValidMetadata(firstItem)) {
      return {
        ...defaultData,
        errorMsg: 'Metadata entry has invalid structure',
      };
    }

    // Validate that title and blurb are not empty
    if (!firstItem.title?.trim() || !firstItem.blurb?.trim()) {
      return {
        ...defaultData,
        errorMsg: 'Metadata title or description is empty',
      };
    }

    return {
      title: firstItem.title.trim(),
      description: firstItem.blurb.trim(),
    };
  } catch (error) {
    return {
      ...defaultData,
      errorMsg: `Error formatting metadata: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    };
  }
};






/**
 * Fetch metadata directly from Contentful (no API route)
 */
export async function getMetadata(): Promise<Metadata> {
  try {
    const contentId = contentfulContentIds.singleEntries['Metadata Entry'];
    const entries = formatAsMetadata(await contentfulForServerEntriesFetch('Metadata Entry', contentId));

    return {
      ...entries
    };
  } catch (error) {
    console.error('Error fetching metadata from Contentful:', error);
    // Fallback metadata
    return {
      title: '[title]',
      description: '[description]',
    };
  }
}