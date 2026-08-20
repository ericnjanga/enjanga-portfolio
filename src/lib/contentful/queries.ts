export const navigationQuery = `
  query HeaderNavigation {
    navigationCollection(
      where: { location: "header" }
      limit: 1
    ) {
      items {
        name
        location
        itemsCollection(limit: 20) {
          items {
            sys {
              id
            }
            __typename

            ... on NavigationItem {
              name
              destinationType
              path
              sectionId
              openInNewTab
              isVisible
            }
          }
        }
      }
    }
  }
`;

export const siteSettingsQuery = `
  query SiteSettings {
    siteSettingsCollection(limit: 1) {
      items {
        siteName
        primaryNavigation {
          __typename

          ... on Navigation {
            name
            location

            itemsCollection(limit: 20) {
              items {
                sys {
                  id
                }
                __typename

                ... on NavigationItem {
                  name
                  destinationType
                  path
                  sectionId
                  openInNewTab
                  isVisible
                }
              }
            }
          }
        }
        footerLinksCollection(limit: 10) { 
          items {
            ... on Link {
              label  
              linkType 
              externalUrl
              openInNewTab 
              accessibleLabel
            }
          }
        }
        copyrightText
        location
      }
    }
  }
`;
//       items {
//         name
//         location
//         itemsCollection(limit: 20) {
//           items {
//             sys {
//               id
//             }
//             __typename

//             ... on NavigationItem {
//               name
//               destinationType
//               path
//               sectionId
//               openInNewTab
//               isVisible
//             }
//           }
//         }
//       }
//     }
//   }
// `;
