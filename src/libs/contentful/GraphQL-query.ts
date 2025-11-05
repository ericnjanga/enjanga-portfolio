// "Fetching a specific section by id" (GraphQL query)
export const queryData = {
  /**
   * Single records
   * ------------------
   */
  pageSection: `
    query getPageSectionEntryQuery($sectionId: String!, $locale1: String!, $locale2: String!) {
      en: pageSection(id: $sectionId, locale: $locale1) {  
        title
        description {
          json
        } 
      }
      fr: pageSection(id: $sectionId, locale: $locale2) {  
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
      $locale1: String!, 
      $locale2: String!
    ) {
      en: infoBlock(id: $sectionId, locale: $locale1) {  
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
      fr: infoBlock(id: $sectionId, locale: $locale2) {  
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
      $locale1: String!, 
      $locale2: String!
    ) {
        en: project(id: $sectionId, locale: $locale1) {  
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
        fr: project(id: $sectionId, locale: $locale2) {  
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
      $locale1: String!, 
      $locale2: String!
    ) {
        en: blogPost(id: $sectionId, locale: $locale1) {  
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
        fr: blogPost(id: $sectionId, locale: $locale2) {  
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
    query getProjectCollectionQuery($locale1: String!, $locale2: String!) {
      en: projectCollection(locale: $locale1) { 
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
      fr: projectCollection(locale: $locale2) { 
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
    query getQuoteCollectionQuery($locale1: String!, $locale2: String!) {
      en: quoteCollection(locale: $locale1) { 
        items { 
          sys {
            id
          }  
          description {
            json
          } 
        } 
      }
      fr: quoteCollection(locale: $locale2) { 
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
      $locale1: String!, 
      $locale2: String!
    ) {
      en: infoBlockCollection(where: { parentId: $parentRefId }, locale: $locale1) {
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
      fr: infoBlockCollection(where: { parentId: $parentRefId }, locale: $locale2) {
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
      $locale1: String!, 
      $locale2: String!
    ) {
      en: blogPostCollection(locale: $locale1) {
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
      fr: blogPostCollection(locale: $locale2) {
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
