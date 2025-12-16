
import { queryData } from './GraphQL-query';
import type { DataFor1, DataFor2, DataFor3, DataFor4, DataFor5 } from '../../utils/dataProcessing/types';



// ...
export const contentfulContentIds = {
  categories: {
    'BannerHomePage Entry': '4llAs4gW4mc1fikxbW6u4V',
    'BannerBlogPage Entry': '1KZzwxEzfTs7rLABpVpjX1',
    'FooterCopyright Entry': '2KSc8hw8VvMNS5rXQP8GEZ',
    'CaseStudy Entry Collection': ['5y2JSha3mykWdGkUf6XcQp'],
    'scopeOfExp Parent Entry Collection': '5OpXyMfZfJlGQzTKJSn9Hw',
    'AboutInfo Entry Collection': '2yc27jrBHSGwDBau6c8qfA',
    'Featured Image': '2eSLi2IP4sZrrPK0AeQPk7',
    'Banner Image': '4inHKl5yMYfQHDc5en3FT2',
    'FooterLinks Entry Collection': '2uxFOT0LB1ET4SfM4dNWvo',
  },
  singleEntries: {
    'Metadata Entry': '5RBmqkxse1dXyVizogH2oH',
    'Links (Published Work)': '3Fo2dEcwjF2C7hCjGzLitJ',
    'QR code': '2a4z7rYXGHCmtaspj0REbl',
    'QR code text': '6ZKYDI1P6NazFQdUxF4JhL',
  }
};


/** 
 * ------------------------------------------------------------------
 * Returns the appropriate GraphQL query, variables, and tracking info
 * for a given content type (`dataFor`) and optional `contentId`.
 *
 * This function centralizes all query/variable logic so that
 * both client-side (ContentfulDataProvider) and server-side utilities
 * (like `contentfulForServerEntriesFetch` and `generateStaticPar***`) can reuse
 * the same configuration without duplicating switch statements.
 *
 * @param dataFor   One of the supported `DataFor` values
 * @param contentId Optional Contentful entry ID, required for single-entry queries
 * @returns         An object with `{ query, variables, trackingInfo }`
 *
 * Example:
 *   const { query, variables } = getContentfulQueryConfig("BlogPost Entry", "abc123");
 */
export function getContentfulQueryConfig(dataFor: DataFor1 | DataFor2 | DataFor3 | DataFor4 | DataFor5, contentId?: string) {
  let query = '';
  let variables: Record<string, any> = {
    locale: 'en-CA',
    order: ["sys_publishedAt_DESC"],
    locale2: 'fr',
    sectionId: '',
    parentRefId: '',
  };
  let trackingInfo = dataFor;

  switch (dataFor) { 
    case 'scopeOfExp Entry Collection':
    case 'scopeOfExp Parent Entry Collection':
    case 'AboutInfo Entry Collection':
    case 'FooterLinks Entry Collection':
      if (dataFor==='scopeOfExp Entry Collection') {
        const expertiseId = contentId;
        query = queryData.infoBlockByParentCollection;
        variables.parentRefId = expertiseId ?? '';
      } else {
        query = queryData.infoBlockByParentCollection;
        variables.parentRefId = contentfulContentIds.categories[dataFor];
      }
      break;

    case 'BannerHomePage Entry':
    case 'BannerBlogPage Entry':
    case 'FooterCopyright Entry':
      query = queryData.infoBlockById;
      variables.sectionId = contentfulContentIds.categories[dataFor];
      break;

    case 'Metadata Entry':
      query = queryData.infoBlockById;
      variables.sectionId = contentfulContentIds.singleEntries[dataFor];
      break;

    case 'FooterLinks --Entry--':
      query = queryData.infoBlockById;
      variables.sectionId = contentId ?? '';
      break;

    case 'CaseStudy Entry':
      query = queryData.projectById;
      variables.sectionId = contentId ?? '';
      break;

    case 'BlogPost Entry':
      query = queryData.blogPostById;
      variables.sectionId = contentId ?? '';
      break;

    case 'CaseStudy Entry Collection':
      query = queryData.projectsCollection;
      break;

    case 'Quotes Entry Collection':
      query = queryData.quotesCollection;
      break;

    case 'BlogPost Entry Collection':
      query = queryData.blogPostCollection;
      break;
  }

  return { query, variables, trackingInfo };
}

