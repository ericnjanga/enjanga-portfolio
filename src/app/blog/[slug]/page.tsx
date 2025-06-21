'use client';

import { Banner } from '@/src/components/Banner';
import { Grid, Column } from '@carbon/react';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function BlogArticlePage({ params }: ArticlePageProps) {
  const mockData = {
    banner: {
      title: 'Article title',
    },
  };

  return (
    <>
      <Banner title={mockData.banner.title} />
      <Grid fullWidth>
        <Column lg={10} md={8} sm={4} className="landing-page__banner">
          <h3>Article content</h3>
          <p>
            Cupcake ipsum dolor sit amet gummies tootsie roll. Powder ice cream
            ice cream brownie pudding chupa chups pastry. Cake tiramisu jelly-o
            cake oat cake. Jelly-o donut lollipop sweet jujubes chocolate cake
            chocolate lollipop. Bear claw ice cream soufflé wafer tiramisu
            halvah sweet I love danish. Bonbon fruitcake candy canes shortbread
            candy candy canes. Cupcake candy muffin carrot cake chocolate. I
            love croissant I love sweet roll tootsie roll toffee powder. Ice
            cream pastry lollipop brownie brownie.
          </p>
        </Column>
      </Grid>
    </>
  );
}
