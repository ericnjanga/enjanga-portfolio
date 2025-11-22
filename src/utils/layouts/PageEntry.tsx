'use client';

import { ContextType1 } from '@utils/dataProcessing/types'; 
import { Banner, CMSRichText } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import 'styles/blogs-and-articles/index.scss';
  
const PageEntry = ({ item }: ContextType1) => (
  <div className="articlePage">
    <Banner
      className="page-banner"
      featuredText={{
        heading: { children: item?.title },
        smartText: {},
        isHidden: 'smartText',
      }}
    /> 
    <article className="page-content">
      <Grid>
        <Column lg={10} md={8} sm={4}>
          <CMSRichText data={item?.description} />
        </Column>
      </Grid>
    </article>
  </div>
);

export default PageEntry;
