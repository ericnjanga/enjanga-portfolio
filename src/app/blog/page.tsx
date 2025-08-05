'use client';

import Link from 'next/link';
import { Banner, CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';

export default function BlogRoot() {
  const mockData = {
    banner: {
      title: 'Blog root page',
    },
  };

  return (
    <>
      <Banner title={mockData.banner.title} />
      <Grid fullWidth>
        <ContentfulFetcher dataFor="List of Blog Posts">
          {({ orderedItems }) =>
            orderedItems?.map((item) => {
              console.log('======', item);
              return (
                <Column
                  key={item.sys.id}
                  lg={5}
                  md={4}
                  sm={4}
                  className="landing-page__banner"
                >
                  <CustomTile title={item.title} />
                </Column>
              );
            })
          }
        </ContentfulFetcher>
      </Grid>
    </>
  );
}
