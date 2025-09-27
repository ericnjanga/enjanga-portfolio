// src/app/best-work/[contentId]/ProjectPage.tsx
'use client';
 
import { Banner, CMSRichText } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import { ContentfulDataProvider } from '@/libs/contentful/dataProvider';
import { ArticlePageProps } from '@/libs/types';
import './../../../styles/_blogs-and-articles.scss'; 
  
const ProjectPage = ({ params }: ArticlePageProps) => (
  <div className="articlePage">
    <ContentfulDataProvider dataFor="Single Work" contentId={params.contentId}>
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
    </ContentfulDataProvider>
  </div>
);

export default ProjectPage;
