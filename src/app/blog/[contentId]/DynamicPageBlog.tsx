// src/app/blog/[contentId]/DynamicPageBlog.tsx
'use client';

import { Banner, CMSRichText } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import ContentfulDataProvider from '@/libs/contentful/dataProvider';
import type { DynamicPageClient } from '@/libs/types';
import 'styles/blogs-and-articles/index.scss';

const DynamicPageBlog = ({ params }: DynamicPageClient) => (
  <div className="articlePage">
    <ContentfulDataProvider dataFor="BlogPost Entry" contentId={params.contentId}>
      {({ item }) => (
        <>
          <Banner
            className="page-banner"
            featuredText={{
              heading: { children: item.title },
              smartText: {},
              isHidden: 'smartText',
            }}
          />
          <article className="page-content">
            <Grid>
              <Column lg={10} md={8} sm={4}>
                <CMSRichText data={item.description} />
              </Column>
            </Grid>
          </article>
        </>
      )}
    </ContentfulDataProvider>
  </div>
);

export default DynamicPageBlog;
