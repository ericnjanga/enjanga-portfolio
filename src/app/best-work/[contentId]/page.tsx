'use client';

import type { Metadata } from 'next';
import { Banner, CMSRichText } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';
import { ArticlePageProps } from '@/libs/types';
import './../../../styles/_blogs-and-articles.scss';
import { generateParamsForContent } from '@/libs/generateStaticParams';

/*
 * This function tells Next.js which dynamic routes to pre-render at build time
 * when running in static export mode (output: "export").
 * It uses our shared utility (generateParamsForContent) to fetch all "Best Work"
 * entries from Contentful, then returns their IDs as route params.
 * Example: if Contentful has works with sys.id = "alpha" and "beta",
 * Next.js will generate /best-work/alpha and /best-work/beta as static pages.
*/
export async function generateStaticParams() {
  return generateParamsForContent('List of Best Work');
}


const ProjectPage = ({ params }: ArticlePageProps) => (
  <div className="articlePage">
    <ContentfulFetcher dataFor="Single Work" contentId={params.contentId}>
      {({ title, richDescription }) => (
        <>
          <Banner
            className="page-banner"
            featuredText={{
              heading: {
                children: title,
              },
              smartText: {},
              isHidden: 'smartText',
            }}
          />

          <article className="page-content">
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
