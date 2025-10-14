'use client';

import {
  Banner,
  CustomTile,
  CTL_valid_linkTo,
} from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import { ContentfulDataProvider } from '@/libs/contentful/dataProvider'; 
import './../../styles/_blogs-and-articles.scss';

export default function BlogRoot() {
  return (
    <div className="blogPage">
      <ContentfulDataProvider dataFor="BannerBlogPage Entry">
        {({ item }) => (
          <Banner
            className="page-banner"
            featuredText={{
              heading: {
                children: item.title,
              },
              smartText: {
                richText: item.description,
              },
            }}
          />
        )}
      </ContentfulDataProvider>

      <article className="page-content">
        <Grid>
          {' '}
          {/* fullWidth */}
          <ContentfulDataProvider dataFor="BlogPost Entry Collection">
            {({ items }) =>
              items?.map((item) => {
                return (
                  <Column
                    key={item?.sys?.id}
                    lg={8}
                    md={4}
                    sm={4}
                    className="..."
                  >
                    <CustomTile
                      featuredText={{
                        heading: {
                          children: item?.title,
                          level: 2,
                        },
                        smartText: {
                          plainText: item?.blurb,
                        },
                        headingMaxLength: 50,
                        plainTextMaxLength: 120,
                      }}
                      layoutStyle="card"
                      media="image"
                      mediaImage={item?.image?.url}
                      linksTo={`/blog/${item?.sys?.id}` as CTL_valid_linkTo}
                    />
                  </Column>
                );
              })
            }
          </ContentfulDataProvider>
        </Grid>
      </article>
    </div>
  );
}
