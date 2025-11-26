'use client';

import { ContextType1 } from '@utils/dataProcessing/types'; 
import { Banner, CMSRichText } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import { useDataDistributorData } from '@utils/context/DataDistributorContext';
import 'styles/blogs-and-articles/index.scss';
  
const PageEntry = ({ item }: ContextType1) => { 
  const { banners } = useDataDistributorData();

  return (
    <div className="articlePage">
      <Banner
        className="page-banner"
        featuredText={{
          heading: { children: item?.title },
          smartText: {},
          isHidden: 'smartText',
        }}
        style={{ backgroundImage: `url(${banners.imgUrl})` }}
      /> 
      <article className="page-content">
        <Grid>
          <Column lg={10} md={8} sm={4}>
            <CMSRichText data={item?.description} />
          </Column>
        </Grid>
      </article>
    </div>
  )
};

export default PageEntry;
