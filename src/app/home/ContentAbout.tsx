import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import './../styles/_grid-of-customTiles.scss';

const ContentAbout = () => (
  <Grid className="grid-of-customTiles grid-of-customTiles-1">
    <Column
      lg={{ span: 5, offset: 11 }}
      md={{ span: 4, offset: 4 }}
      sm={4}
      className=""
    >
      <Grid className="tabs-group-content--single-col">
        <Column lg={16} md={8} sm={4}>
          <CustomTile
            showsModal={true}
            className="home-customTile"
            iconName="Leadership"
            title="title"
            text="Sugar plum sugar plum pie I love gummi bears sweet roll bear claw. Jelly-o dessert cookie."
          />
        </Column>
      </Grid>
    </Column>
    <Column lg={{ span: 10, offset: 6 }} md={8} sm={4} className="">
      <Grid className="tabs-group-content">
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            showsModal={true}
            className="home-customTile"
            iconName="App Developer"
            title="title"
            text="Sugar plum sugar plum pie I love gummi bears sweet roll bear claw. Jelly-o dessert cookie."
          />
        </Column>
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            showsModal={true}
            className="home-customTile"
            iconName="Hills"
            title="title"
            text="Sugar plum sugar plum pie I love gummi bears sweet roll bear claw. Jelly-o dessert cookie."
          />
        </Column>
      </Grid>
    </Column>
  </Grid>
);

export default ContentAbout;
