import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { InformationBlock } from '@/libs/CMS-content-types';

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
            // modalRichDescription={tab.description}
            media="pictogram"
            mediaPictogram="Leadership"
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
