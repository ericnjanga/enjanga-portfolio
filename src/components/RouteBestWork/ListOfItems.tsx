import React from 'react';
import { CustomTile } from 'enjanga-components-library'; 
import 'enjanga-components-library/custom-tile.css'; // Styling for <CustomT** /> component
import { ContentModel3 } from '@utils/dataProcessing/types';
import { enjGetLayout } from '@libs/layouts';




const ListOfItems = ({ items }:{ items: ContentModel3[] }) => {

  const layoutGridStyle = React.useMemo(() => {
    return enjGetLayout({ type: 'RAM', itemMaxWidth: 430, gridGap: 1.5 });
  }, []);

  return (
    <div style={layoutGridStyle}>
      {items?.map((item, index) => {
        return (
          <CustomTile
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
            layoutStyle="banner"
            modalIsAvailable={false}
            linksTo={`/best-work/${item?.sys?.id}`}
          />
        );
      })}
    </div>
  )
};

export default ListOfItems;
