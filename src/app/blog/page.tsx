'use client';

import Link from 'next/link';
import { Banner } from '@/src/components/Banner';
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
