'use client';

import React from 'react';
import {
  Banner,
  TilePost,
  CTL_valid_linkTo,
} from 'enjanga-components-library';
import 'enjanga-components-library/banner.css'; // Styling for <Bann** /> component
import 'enjanga-components-library/post-tile.css'; // Styling for <PostT** /> component
import type { ContextType1, ContextType4 } from '@utils/dataProcessing/types';
import { useDataDistributorData } from '@utils/context/DataDistributorContext';
import { enjGetLayout } from '@libs/layouts';
import 'styles/blogs-and-articles/index.scss';

type PageListingType = {
  banner: ContextType1;
  listOfEntries: ContextType4;
};

export default function PageListing({ banner, listOfEntries }: PageListingType) {
  const { banners } = useDataDistributorData(); 
  const layoutGridStyle = React.useMemo(() => {
    return enjGetLayout({ type: 'RAM', itemMaxWidth: 350, gridGap: 1.8 });
  }, []);

  return (
    <div className="blogPage page-section-spacing">
      <Banner
        className="page-banner section-block-bm"
        featuredText={{
          heading: {
            children: banner?.item.title,
          },
          smartText: {
            richText: banner?.item.description,
          },
        }}
        imgBgUrl={banners.imgUrl}
      />

      <article className="page-content">
        <div className="enj-container" style={layoutGridStyle}>
          {listOfEntries?.items?.map((item) => {
            return ( 
              <TilePost
                key={item?.sys?.id}
                featuredText={{
                  heading: {
                    children: item?.title,
                    level: 3,
                  },
                  smartText: {
                    plainText: item?.blurb,
                  },
                  headingMaxLength: 50,
                  plainTextMaxLength: 120,
                }}  
                mediaImage={{
                  url: item?.image?.url || '',
                  alt: item?.image?.description || '',
                  width: item?.image?.width,
                  height: item?.image?.height,
                }}
                linksTo={`/blog/${item?.sys?.id}` as CTL_valid_linkTo}
              /> 
            );
          })}
        </div>
      </article>
    </div>
  );
}
