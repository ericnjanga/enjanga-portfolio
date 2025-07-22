import { CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';

interface Expertise4Tab {
  className?: string;
}

const Expertise4Tab = ({ className }: Expertise4Tab) => (
  <Grid className={className}>
    <Column lg={5} md={6} sm={4}>
      <article className="intro-text">
        <h3>Section 4 title (444)</h3>
        <p>
          <b>--- 4 ---</b> sit amet marshmallow I love muffin. Sesame snaps
          bonbon pudding halvah candy canes lollipop bear claw. Apple pie
          cupcake brownie oat cake candy canes gummies liquorice halvah apple
          pie.
        </p>
      </article>
    </Column>
    <Column lg={{ span: 10, offset: 6 }} md={8} sm={4}>
      <Grid className="tabs-group-content">
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            showsModal={true}
            className="home-customTile"
            title="section 4 - expertise 4"
            text="Apple pie cupcake
        brownie oat cake candy canes gummies liquorice halvah apple pie"
          />
        </Column>
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            showsModal={true}
            className="home-customTile"
            title="section 4 - expertise 4"
            text="Apple pie cupcake
        brownie oat cake candy canes gummies liquorice halvah apple pie"
          />
        </Column>
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            showsModal={true}
            className="home-customTile"
            title="section 4 - expertise 4"
            text="Apple pie cupcake
        brownie oat cake candy canes gummies liquorice halvah apple pie"
          />
        </Column>
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            showsModal={true}
            className="home-customTile"
            title="section 4 - expertise 4"
            text="Apple pie cupcake
        brownie oat cake candy canes gummies liquorice halvah apple pie"
          />
        </Column>
      </Grid>
    </Column>
  </Grid>
);

export default Expertise4Tab;
