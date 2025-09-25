import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-components-library';
import { InformationBlock } from '@/libs/contentful/types';

const ContentBestWork = ({
  listOfItems,
}: {
  listOfItems: InformationBlock[] | undefined;
}) => (
  <Grid className="tabs-group-content">
    {listOfItems?.map((item) => {
      return (
        <Column key={item.sys.id} lg={8} md={4} sm={4}>
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
            linksTo={`/best-work/${item.sys.id}`}
            // modalRichDescription={tab.description}
            // media="pictogram"
            // mediaPictogram="Leadership"
            // stackOrder="horizontal"
            // title={title}
            // text={blurb}
          />
        </Column>
      );
    })}
  </Grid>
);

export default ContentBestWork;
