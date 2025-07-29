'use client';

import { Banner, CMSRichText } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';
import styles from './../../styles/articlePage.module.scss';
import clsx from 'clsx';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';

interface ProjectPageProps {
  params: {
    contentId: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => (
  <div className={clsx(styles.articlePage)}>
    <ContentfulFetcher dataFor="Single work" contentId={params.contentId}>
      {({ title, richDescription }) => (
        <>
          <Banner className={styles.banner} title={title} />
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

export default ProjectPage;
