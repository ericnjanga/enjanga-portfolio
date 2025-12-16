// "Fetching a specific section by id" (GraphQL query)
export const queryData = {
  /**
   * Single records
   * ------------------
   */
  pageSection: `
    query getPageSectionEntryQuery($sectionId: String!, $locale: String!) {
      en: pageSection(id: $sectionId, locale: $locale) {  
        title
        description {
          json
        } 
      }
    }
  `,

  infoBlockById: `
    query getInfoBlockEntryQuery(
      $sectionId: String!, 
      $locale: String!
    ) {
      en: infoBlock(id: $sectionId, locale: $locale) {  
        title
        blurb
        description {
          json
          links {
            assets {
              block {
                sys { id }
                url
                title
                description
              }
            }
          }
        }
      }
    }
  `,

  // description {...} has been inhanced to display images
  projectById: `
    query projectEntryQuery(
      $sectionId: String!, 
      $locale: String!
    ) {
        en: project(id: $sectionId, locale: $locale) {  
          sys {
            id
          }
          title
          blurb
          description {
            json
            links {
              assets {
                block {
                  sys { id }
                  url
                  title
                  description
                }
              }
            }
          }
        }
      }
  `,
  blogPostById: `
    query blogPostEntryQuery(
      $sectionId: String!, 
      $locale: String!
    ) {
      en: blogPost(id: $sectionId, locale: $locale) {  
        sys {
          id
        }
        title
        blurb
        description {
          json
          links {
            assets {
              block {
                sys { id }
                url
                title
                description
              }
            }
          }
        }
      }
    }
  `,

  /**
   * Collections (multiple records)
   * ------------------
   */
  projectsCollection: `
    query getProjectCollectionQuery($locale: String!, $order: [ProjectOrder]) {
      en: projectCollection(locale: $locale, order: $order) { 
        items { 
          sys {
            id
          }
          title
          blurb
          description {
            json
          }
          order
        } 
      }
    }
  `,
  quotesCollection: `
    query getQuoteCollectionQuery($locale: String!) {
      en: quoteCollection(locale: $locale) { 
        items { 
          sys {
            id
          }  
          description {
            json
          } 
        } 
      }
    }
  `,
  infoBlockByParentCollection: `
    query infoBlocksByParentQuery(
      $parentRefId: String!,
      $locale: String!
    ) {
      en: infoBlockCollection(where: { parentId: $parentRefId }, locale: $locale) {
        items {
          sys {
            id
          }
          parentId
          order
          icon
          title
          blurb
          description {
            json
          }
        }
      }
    }
  `,
  blogPostCollection: `
    query blogPostCollectionQuery(
      $locale: String!,
      $order: [BlogPostOrder]
    ) {
      en: blogPostCollection(locale: $locale, order: $order) {
        items {
          sys {
            id
          }
          title
          blurb
          image {
            url
            title
            description
          }
        }
      }
    }
  `,
};
