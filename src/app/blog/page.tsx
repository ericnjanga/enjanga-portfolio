'use client';

import Link from 'next/link';
import { Banner } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';

export default function BlogRoot() {
  const mockData = {
    banner: {
      title: 'Blog root page',
    },
  };

  return (
    <>
      <Banner title={mockData.banner.title} />
      <Grid fullWidth>
        <Column lg={16} md={8} sm={4} className="landing-page__banner">
          <p>
            <Link href="/blog/article-page" passHref legacyBehavior>
              Article page
            </Link>
          </p>
        </Column>
      </Grid>
    </>
  );
}
