'use client';

import { ContextType1 } from '@utils/dataProcessing/types'; 
import { Banner, CMSRichText } from 'enjanga-components-library';
import 'enjanga-components-library/banner.css'; // Styling for <Bann** /> component
import 'enjanga-components-library/cms-rich-text.css'; // Styling for <CMSRichT** /> component
import { useDataDistributorData } from '@utils/context/DataDistributorContext';
import 'styles/blogs-and-articles/index.scss';
  
const PageEntry = ({ item }: ContextType1) => { 
  const { banners } = useDataDistributorData();

  return (
    <div className="articlePage page-section-spacing">
      <Banner
        className="page-banner section-block-bm"
        featuredText={{
          heading: { children: item?.title },
          smartText: {},
          isHidden: 'smartText',
        }}
        imgBgUrl={banners.imgUrl}
      /> 
      <article className="page-content">
        <div className="enj-container">
          <div 
            style={{ maxWidth: 930 }}
          >
            <CMSRichText data={item?.description} />
          </div>
        </div>
      </article>
    </div>
  )
};

export default PageEntry;
