import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-components-library';
import 'enjanga-components-library/custom-tile.css'; // Styling for <CustomT** /> component
import '@/styles/_enj-grid-system.scss';
import { CP_nameType } from 'enjanga-components-library';
import type { ContentModel2 } from '@utils/dataProcessing/types';


const ListOfItems = (items: ContentModel2[]) => {
  const card1 = items && items[0];
  const card2 = items && items[1];
  const card3 = items && items[2];

  return (
    <Grid className="enj-gridSys enj-gridSys-type-2">
      <Column
        lg={{ span: 5, offset: 11 }}
        md={{ span: 4, offset: 4 }}
        sm={4}
        className="">
        <Grid className="enj-gridSys__offset-col">
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
        <Grid className="enj-gridSys__cols-wrapper">
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
    </Grid>
  );
};

export default ListOfItems;
