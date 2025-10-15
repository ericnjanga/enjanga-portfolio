// src/app/best-work/[contentId]/DynamicPageProject.tsx
'use client';
 
import { Banner, CMSRichText } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import { ContentfulDataProvider } from '@/libs/contentful/dataProvider';
import type { DynamicPageClient } from '@/libs/types';
import './../../../styles/_blogs-and-articles.scss'; 
  
const DynamicPageProject = ({ params }: DynamicPageClient) => (
  <div className="articlePage">
    <ContentfulDataProvider dataFor="CaseStudy Entry" contentId={params.contentId}>
      {({ item }) => (
        <>
          <Banner
            className="page-banner"
            featuredText={{
              heading: {
                children: item.title,
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
                <CMSRichText data={item.description} />
              </Column>
            </Grid>
          </article>
        </>
      )}
    </ContentfulDataProvider>
  </div>
);

export default DynamicPageProject;
