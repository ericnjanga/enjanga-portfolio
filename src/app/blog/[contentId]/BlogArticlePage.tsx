// src/app/blog/[contentId]/BlogArticlePage.tsx
'use client';

import { Banner, CMSRichText } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';
import { ArticlePageProps } from '@/libs/types';
import './../../../styles/_blogs-and-articles.scss';

const BlogArticlePage = ({ params }: ArticlePageProps) => (
  <div className="articlePage">
    <ContentfulFetcher dataFor="Single Blog Entry" contentId={params.contentId}>
      {({ title, richDescription }) => (
        <>
          <Banner
            className="page-banner"
            featuredText={{
              heading: { children: title },
              smartText: {},
              isHidden: 'smartText',
            }}
          />
          <article className="page-content">
            <Grid>
              <Column lg={10} md={8} sm={4}>
                <CMSRichText data={richDescription} />
              </Column>
            </Grid>
          </article>
        </>
      )}
    </ContentfulFetcher>
  </div>
);

export default BlogArticlePage;
