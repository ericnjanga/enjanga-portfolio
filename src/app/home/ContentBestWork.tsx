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
      console.log('===BestWork===', item);
      return (
        <Column key={item.sys.id} lg={8} md={4} sm={4}>
          <CustomTile
            featuredText={{
              heading: {
                children: item.title,
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
            linksTo={`/best-work/${item.sys.id}`}
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
