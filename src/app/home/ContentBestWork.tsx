import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library

const ContentBestWork = () => (
  <Grid className="tabs-group-content">
    <Column lg={16} md={8} sm={4} className="landing-page__tab-content">
      <CustomTile
        linksTo="best-work/project-page"
        stackOrder="horizontal"
        title="...Biscuit tootsie roll fruitcake gummies marshmallow bear"
        text="Marzipan halvah topping chocolate bonbon chocolate cake cupcake jujubes. Soufflé tiramisu gummies brownie bonbon. Dragée lemon drops jelly-o powder marzipan chocolate cake candy canes pastry. Tiramisu apple pie halvah tootsie roll apple pie."
      />
    </Column>
  </Grid>
);

export default ContentBestWork;
