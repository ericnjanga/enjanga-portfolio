import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library

const ContentAbout = () => (
  <Grid className="">
    <Column lg={{ span: 5, offset: 11 }} md={4} sm={4} className="">
      <CustomTile
        iconName="Leadership"
        title="title"
        text="component text ..."
      />
    </Column>
    <Column lg={{ span: 10, offset: 6 }} md={4} sm={4} className="">
      <Grid className="">
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            iconName="App Developer"
            title="title"
            text="component text ..."
          />
        </Column>
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            iconName="Hills"
            title="title"
            text="component text ..."
          />
        </Column>
      </Grid>
    </Column>
  </Grid>
);

export default ContentAbout;
