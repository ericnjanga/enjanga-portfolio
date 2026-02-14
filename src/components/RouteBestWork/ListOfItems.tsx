import React from 'react';
import { TileBanner } from 'enjanga-components-library'; 
import 'enjanga-components-library/tile-banner.css'; // Styling for <CustomT** /> component
import { ContentModel3 } from '@utils/dataProcessing/types';
import './index.scss';
import { enjGetLayout } from '@libs/layouts';




const ListOfItems = ({ items }:{ items: ContentModel3[] }) => {

  const layoutGridStyle = React.useMemo(() => {
    return enjGetLayout({ type: 'RAM', itemMaxWidth: 430, gridGap: 1.5 });
  }, []);

  return (
    <div className='list-of-items' style={layoutGridStyle}>
      {items?.map((item, index) => {
        return (
          <TileBanner
            key={item?.sys?.id ?? index} 
            featuredText={{
              heading: {
                children: item.title,
                level: 3,
              },
              smartText: {
                plainText: item.blurb,
              },
            }}
            linksTo={`/best-work/${item?.sys?.id}`}
          />
        );
      })}
    </div>
  )
};

export default ListOfItems;
