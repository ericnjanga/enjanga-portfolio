'use client';

import Link from 'next/link';
import {
  Banner,
  CustomTile,
  CTL_valid_linkTo,
} from 'enjanga-components-library'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';
import './../../styles/_blogs-and-articles.scss';

export default function BlogRoot() {
  return (
    <div className="blogPage">
      <ContentfulFetcher dataFor="Blog Page Banner">
        {({ title, richDescription }) => (
          <Banner
            className="page-banner"
            featuredText={{
              heading: {
                children: title,
              },
              smartText: {
                richText: richDescription,
              },
            }}
          />
        )}
      </ContentfulFetcher>

      <article className="page-content">
        <Grid>
          {' '}
          {/* fullWidth */}
          <ContentfulFetcher dataFor="List of Blog Posts">
            {({ orderedItems }) =>
              orderedItems?.map((item) => {
                return (
                  <Column
                    key={item.sys.id}
                    lg={8}
                    md={4}
                    sm={4}
                    className="..."
                  >
                    <CustomTile
                      featuredText={{
                        heading: {
                          children: item.title,
                          level: 2,
                        },
                        smartText: {
                          plainText: item.blurb,
                        },
                        headingMaxLength: 50,
                        plainTextMaxLength: 120,
                      }}
                      layoutStyle="card"
                      media="image"
                      mediaImage={item.image?.url}
                      linksTo={`/blog/${item?.sys?.id}` as CTL_valid_linkTo}
                    />
                  </Column>
                );
              })
            }
          </ContentfulFetcher>
        </Grid>
      </article>
    </div>
  );
}
