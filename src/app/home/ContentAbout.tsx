import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-components-library';
import '@/styles/_grid-of-customTiles.scss';
import { ContentfulDataProvider } from '@/libs/contentful/dataProvider';
import { CP_nameType } from 'enjanga-components-library';

const ContentAbout = () => (
  <Grid className="grid-of-customTiles grid-of-customTiles-1">
    <ContentfulDataProvider dataFor="AboutInfo Entry Collection">
      {({ items }) => {
        const card1 = items && items[0];
        const card2 = items && items[1];
        const card3 = items && items[2];

        return (
          <>
            <Column
              lg={{ span: 5, offset: 11 }}
              md={{ span: 4, offset: 4 }}
              sm={4}
              className=""
            >
              <Grid className="tabs-group-content--single-col">
                <Column lg={16} md={8} sm={4}>
                  <CustomTile
                    className=""
                    featuredText={{
                      heading: {
                        children: card1?.title,
                        level: 3,
                      },
                      smartText: {
                        plainText: card1?.blurb,
                      },
                    }}
                    layoutStyle="card"
                    modalIsAvailable={true}
                    modalRichDescription={card1?.description}
                    media="pictogram"
                    mediaPictogram={card1?.icon as CP_nameType}
                  />
                </Column>
              </Grid>
            </Column>

            <Column lg={{ span: 10, offset: 6 }} md={8} sm={4} className="">
              <Grid className="tabs-group-content">
                <Column lg={5} md={4} sm={4}>
                  <CustomTile
                    className=""
                    featuredText={{
                      heading: {
                        children: card2?.title,
                        level: 3,
                      },
                      smartText: {
                        plainText: card2?.blurb,
                      },
                    }}
                    layoutStyle="card"
                    modalIsAvailable={true}
                    modalRichDescription={card2?.description}
                    media="pictogram"
                    mediaPictogram={card2?.icon as CP_nameType}
                  />
                </Column>

                <Column lg={5} md={4} sm={4}>
                  <CustomTile
                    className=""
                    featuredText={{
                      heading: {
                        children: card3?.title,
                        level: 3,
                      },
                      smartText: {
                        plainText: card3?.blurb,
                      },
                    }}
                    layoutStyle="card"
                    modalIsAvailable={true}
                    modalRichDescription={card3?.description}
                    media="pictogram"
                    mediaPictogram={card3?.icon as CP_nameType}
                  />
                </Column>
              </Grid>
            </Column>
          </>
        );
      }}
    </ContentfulDataProvider>
  </Grid>
);

export default ContentAbout;
