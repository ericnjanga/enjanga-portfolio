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
        } 
      }
      fr: infoBlock(id: $sectionId, locale: $locale2) {  
        title
        blurb
        description {
          json
        } 
      }
    }
  `,
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
          image {
            url
            title
            description
          }
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
          image {
            url
            title
            description
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
        }
      }
      fr: blogPostCollection(locale: $locale2) {
        items {
          sys {
            id
          }
          title
        }
      }
    }
  `,
};
