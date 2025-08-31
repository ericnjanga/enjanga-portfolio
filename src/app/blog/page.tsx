'use client';

import Link from 'next/link';
import { Banner, CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';
import { Children } from 'react';

export default function BlogRoot() {
  return (
    <>
      <Banner
        featuredText={{
          heading: {
            children: '*** Blog page',
          },
          smartText: {},
          isHidden: 'smartText',
        }}
      />
      <Grid fullWidth>
        <ContentfulFetcher dataFor="List of Blog Posts">
          {({ orderedItems }) =>
            orderedItems?.map((item) => {
              return (
                <Column key={item.sys.id} lg={8} md={4} sm={4} className="...">
                  {/* <CustomTile title={item.title} /> */}

                  <CustomTile
                    featuredText={{
                      heading: {
                        children: item.title,
                        level: 3,
                      },
                      smartText: {
                        plainText: item.blurb,
                      },
                    }}
                    layoutStyle="card"
                    modalIsAvailable={false}
                    // modalRichDescription={tab.description}
                    media="image"
                    mediaImage={item.image?.url}
                    // TODO: Troubleshoot this type validation whenever possible
                    linksTo={`/blog/${item?.sys?.id}`}
                    // stackOrder="horizontal"
                    // title={title}
                    // text={blurb}
                  />
                </Column>
              );
            })
          }
        </ContentfulFetcher>
      </Grid>
    </>
  );
}
