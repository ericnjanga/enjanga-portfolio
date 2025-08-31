'use client';

import { Banner } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';
import { ArticlePageProps } from '@/libs/types';
import { CMSRichText } from 'enjanga-next-3-components-lib';
import styles from '@/styles/articlePage.module.scss';

const BlogArticlePage = ({ params }: ArticlePageProps) => (
  <div>
    <ContentfulFetcher dataFor="Single Blog Post" contentId={params.contentId}>
      {({ title, richDescription }) => (
        <>
          <Banner
            featuredText={{
              heading: {
                children: title,
              },
              smartText: {},
              isHidden: 'smartText',
            }}
          />

          <article className={styles.article}>
            <Grid fullWidth>
              <Column lg={10} md={8} sm={4} className="...">
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
