// "Fetching a specific section by id" (GraphQL query)
export const queryData = {
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
  projectsCollection: `
    query getProjectCollection($locale1: String!, $locale2: String!) {
      en: projectCollection(locale: $locale1) { 
        items {
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
  infoBlockByParent: `
    query infoBlocksByParent($parentRefId: String!) {
      infoBlockCollection(where: { parentId: $parentRefId }) {
        items {
          parentId
          title
          blurb
          description {
            json
          }
        }
      }
    }
  `,
  expertiseSpecificationCollection: `
    query getExpertiseSpecificationCollection(
      $parentId: String!
      $locale1: String!
      $locale2: String!
    ) {
      en: expertiseSpecificationCollection(
        locale: $locale1
        where: { parentId: $parentId }
      ) {
        items {
          title
          blurb
          description {
            json
          }
        }
      }
      fr: expertiseSpecificationCollection(
        locale: $locale2
        where: { parentId: $parentId }
      ) {
        items {
          title
          blurb
          description {
            json
          }
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
};

// projectsCollection: `
// query getProjectCollection($locale1: String!, $locale2: String!) {
//   en: projectCollection(locale: $locale1) {
//     items {
//       title
//       blurb
//       description {
//         json
//       }
//     }
//   }
//   fr: projectCollection(locale: $locale2) {
//     items {
//       title
//       blurb
//       description {
//         json
//       }
//     }
//   }
// }
// `,
