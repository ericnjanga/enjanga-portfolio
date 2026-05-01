import React from 'react';
import { TileBanner } from 'enjanga-components-library'; 
import 'enjanga-components-library/tile-banner.css'; // Styling for <CustomT** /> component
import type { OrganizationCollection } from '@/libs/organizations/types';
import './index.scss';
import { enjGetLayout } from '@libs/layouts';




const ListOfItems = ({ organizations }: { organizations: OrganizationCollection }) => {

  const layoutGridStyle = React.useMemo(() => {
    return enjGetLayout({ type: 'RAM', itemMaxWidth: 430, gridGap: 1.5 });
  }, []);

  return (
    <div className='list-of-items' style={layoutGridStyle}>
      {organizations?.map((organization, index) => {
        return (
          <TileBanner
            key={organization.id ?? index} 
            featuredText={{
              heading: {
                children: organization.title,
                level: 3,
              },
              smartText: {
                plainText: organization.subtitle,
              },
            }}
            linksTo={`/experience/${organization.slug}`}
          />
        );
      })}
    </div>
  )
};

export default ListOfItems;
