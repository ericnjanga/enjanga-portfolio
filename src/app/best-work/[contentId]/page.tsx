'use client';

import type { Metadata } from 'next';
import { Banner, CMSRichText } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';
import styles from '@/styles/articlePage.module.scss';
import clsx from 'clsx';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';
import { ArticlePageProps } from '@/libs/types';

// TODO: Update metadata for every dynamica page change (metadata cannot be updated on 'use client' pages)
// export const metadata: Metadata = {
//   title: '??????Eric Njanga',
//   description: '??????Software engineer & Design technologist',
// };

const ProjectPage = ({ params }: ArticlePageProps) => (
  <div className={clsx(styles.articlePage)}>
    <ContentfulFetcher dataFor="Single Work" contentId={params.contentId}>
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
            <Grid>
              {' '}
              {/* fullWidth */}
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

export default ProjectPage;
