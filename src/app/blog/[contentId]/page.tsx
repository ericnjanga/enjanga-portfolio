'use client';

import { Banner, CMSRichText } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';
import { ArticlePageProps } from '@/libs/types';
import './../../../styles/_blogs-and-articles.scss';
import { generateParamsForContent } from '@/libs/generateStaticParams';

/*
 * This function tells Next.js which dynamic routes to pre-render at build time
 * when running in static export mode (output: "export").
 * It calls our shared utility (generateParamsForContent) to fetch all blog posts
 * from Contentful, then returns their IDs as route params.
 * Example: if Contentful has posts with sys.id = "abc" and "xyz",
 * Next.js will generate /blog/abc and /blog/xyz as static pages.
*/
export async function generateStaticParams() {
  return generateParamsForContent('List of Blog Posts');
}


const BlogArticlePage = ({ params }: ArticlePageProps) => (
  <div className="articlePage">
    <ContentfulFetcher dataFor="Single Blog Post" contentId={params.contentId}>
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

export default BlogArticlePage;
