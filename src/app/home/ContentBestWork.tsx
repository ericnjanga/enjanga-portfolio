import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-components-library'; 
import { ContentModel3 } from '@/libs/contentful/types';




const ContentBestWork = ({ listOfItems }: { listOfItems: ContentModel3[] }) => (
  <Grid className="tabs-group-content">
    {listOfItems?.map((item, index) => {
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

export default ContentBestWork;
