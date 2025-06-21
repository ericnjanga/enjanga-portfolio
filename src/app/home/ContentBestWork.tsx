import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library

const ContentBestWork = () => (
  <Grid className="tabs-group-content">
    <Column lg={16} md={8} sm={4} className="landing-page__tab-content">
      <CustomTile title="title" text="component text ..." />
    </Column>
  </Grid>
);

export default ContentBestWork;
