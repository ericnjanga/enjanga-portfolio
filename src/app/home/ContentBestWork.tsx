import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-components-library';
import { InformationBlock } from '@/libs/contentful/types';



const ContentBestWorkSkeleton = () => (
  <>
    <Column lg={8} md={4} sm={4}>
      <CustomTile
        featuredText={{
          heading: {
            children: undefined,
            level: 3,
          },
          smartText: {
            plainText: undefined,
          },
        }}
        layoutStyle="card"
      />
    </Column>
    <Column lg={8} md={4} sm={4}>
      <CustomTile
        featuredText={{
          heading: {
            children: undefined,
            level: 3,
          },
          smartText: {
            plainText: undefined,
          },
        }}
        layoutStyle="card"
      />
    </Column>
  </>
);


const ContentBestWork = ({
  listOfItems,
}: {
  listOfItems: InformationBlock[] | undefined;
}) => (
  <Grid className="tabs-group-content">
    {!listOfItems && <ContentBestWorkSkeleton />}

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
          />
        </Column>
      );
    })}
  </Grid>
);

export default ContentBestWork;
