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
        sys {
          id
        }
        siteName
        primaryNavigation {
          __typename

          ... on Navigation {
            sys {
              id
            }
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


export const homePageQuery = `
  query HomePage($slug: String!) {
    homePageCollection(where: { slug: $slug },limit: 1) {
      items {
        sys {
          id
        } 
        slug
        seoTitle
        seoDescription

        hero {
          __typename

          ... on Hero {
            sys {
              id
            } 
            title
            subtitle 
          }
        }

        expertiseSection {
          __typename

          ... on ExpertiseSection {
            sys {
              id
            } 
            title

            expertiseItemsCollection(limit: 10) {
              items {
                ... on ExpertiseItem {
                  sys {
                    id    
                  }
                  title
                  description
                }
              }
            }
          }
        }

        aboutSection {
          __typename

          ... on ContentSection {
            sys {
              id
            } 
            title 

            body {
              json 
            }

            image { 
              url 
              width
              height
              description
            }

            imageAltText
            imagePosition

            cta {
              __typename 
              
              ... on Link {
                __typename
                sys {
                  id
                } 
                label  
                linkType 
                externalUrl
                openInNewTab 
                accessibleLabel
              }
            }
          }
        }
      }
    }
  }
`;
