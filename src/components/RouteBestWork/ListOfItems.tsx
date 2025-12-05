import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-components-library'; 
import 'enjanga-components-library/custom-tile.css'; // Styling for <CustomT** /> component
import { ContentModel3 } from '@utils/dataProcessing/types';




const ListOfItems = ({ items }:{ items: ContentModel3[] }) => (
  <Grid className="enj-gridSys enj-gridSys-type-3">
    {items?.map((item, index) => {
      return (
        <Column key={item?.sys?.id ?? index} lg={8} md={4} sm={4}>
          <CustomTile
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
        </Column>
      );
    })}
  </Grid>
);

export default ListOfItems;
