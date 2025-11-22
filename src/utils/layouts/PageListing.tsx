'use client';

import {
  Banner,
  CustomTile,
  CTL_valid_linkTo,
} from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import type { ContextType1, ContextType4 } from '@utils/dataProcessing/types';
import 'styles/blogs-and-articles/index.scss';

type PageListingType = {
  banner: ContextType1;
  listOfEntries: ContextType4;
};

export default function PageListing({
  banner,
  listOfEntries,
}: PageListingType) {
  return (
    <div className="blogPage">
      <Banner
        className="page-banner"
        featuredText={{
          heading: {
            children: banner?.item.title,
          },
          smartText: {
            richText: banner?.item.description,
          },
        }}
      />

      <article className="page-content">
        <Grid>
          {listOfEntries?.items?.map((item) => {
            return (
              <Column key={item?.sys?.id} lg={8} md={4} sm={4} className="...">
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
          })}
        </Grid>
      </article>
    </div>
  );
}
