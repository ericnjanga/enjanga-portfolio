import React from 'react';
import { TileBanner } from 'enjanga-components-library'; 
import 'enjanga-components-library/tile-banner.css'; // Styling for <CustomT** /> component
import type { OrganizationCollection } from '@/libs/organizations/types';
import './index.scss';

const ListOfItems = ({ organizations }: { organizations: OrganizationCollection }) => {
  return (
    <div className='list-of-items'>
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
