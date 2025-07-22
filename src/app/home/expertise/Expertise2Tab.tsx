import { CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';

interface Expertise2Tab {
  className?: string;
}

const Expertise2Tab = ({ className }: Expertise2Tab) => (
  <Grid className={className}>
    <Column lg={5} md={6} sm={4}>
      <article className="intro-text">
        <h3>Section 2 title (222)</h3>
        <p>
          <b>--- 2 ---</b> sit amet marshmallow I love muffin. Sesame snaps
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
            className="home-customTile"
            title="section 2 - expertise 1"
            text="Apple pie cupcake
        brownie oat cake candy canes gummies liquorice halvah apple pie"
          />
        </Column>
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            className="home-customTile"
            title="section 2 - expertise 2"
            text="Apple pie cupcake
        brownie oat cake candy canes gummies liquorice halvah apple pie"
          />
        </Column>
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            className="home-customTile"
            title="section 2 - expertise 3"
            text="Apple pie cupcake
        brownie oat cake candy canes gummies liquorice halvah apple pie"
          />
        </Column>
        <Column lg={5} md={4} sm={4}>
          <CustomTile
            className="home-customTile"
            title="section 2 - expertise 4"
            text="Apple pie cupcake
        brownie oat cake candy canes gummies liquorice halvah apple pie"
          />
        </Column>
      </Grid>
    </Column>
  </Grid>
);

export default Expertise2Tab;
