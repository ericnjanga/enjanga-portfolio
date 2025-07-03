'use client';

import { Banner } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';
import styles from './../../styles/articlePage.module.scss';
import clsx from 'clsx';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => (
  <div className={clsx(styles.articlePage)}>
    <Banner isJumbtron={false} className={styles.banner} title={params.slug} />
    <article className={styles.article}>
      <Grid fullWidth>
        <Column lg={10} md={8} sm={4} className="...">
          <h2>Section title 1</h2>
          <p>
            Cupcake ipsum dolor sit amet fruitcake powder fruitcake dragée. Oat
            cake sweet roll tootsie roll sesame snaps dragée candy gummies.
            Toffee jujubes candy jujubes bear claw jujubes. Gingerbread cupcake
            candy canes sugar plum I love soufflé. Jelly beans sweet roll
            shortbread wafer shortbread. Shortbread caramels I love I love bear
            claw jelly beans. Danish liquorice halvah brownie I love cookie
            dessert brownie jelly beans.
          </p>

          <br />
          <br />

          <h2>Section title 1</h2>
          <p>
            Cupcake ipsum dolor sit amet fruitcake powder fruitcake dragée. Oat
            cake sweet roll tootsie roll sesame snaps dragée candy gummies.
            Toffee jujubes candy jujubes bear claw jujubes. Gingerbread cupcake
            candy canes sugar plum I love soufflé. Jelly beans sweet roll
            shortbread wafer shortbread. Shortbread caramels I love I love bear
            claw jelly beans. Danish liquorice halvah brownie I love cookie
            dessert brownie jelly beans.
          </p>
          <p>
            Gummies liquorice icing gummies tootsie roll. Donut cake tart
            lollipop lollipop jelly-o dragée tiramisu liquorice. Cotton candy
            chupa chups soufflé jujubes marzipan caramels apple pie. Shortbread
            tootsie roll oat cake I love bonbon pastry. Apple pie halvah I love
            I love I love bear claw gummies wafer pastry. Caramels chocolate
            cake brownie biscuit bonbon. Dessert I love oat cake I love chupa
            chups carrot cake. Cotton candy caramels lollipop powder gummi bears
            gingerbread topping chupa chups tootsie roll. Biscuit fruitcake
            toffee fruitcake donut donut sweet roll. Cake cake jelly beans
            gummies apple pie tart chocolate bar powder pie.
          </p>

          <br />
          <br />

          <blockquote>
            <p>
              Oat cake sweet roll tootsie roll sesame snaps dragée candy
              gummies. Toffee jujubes candy jujubes bear claw jujubes.
              Gingerbread cupcake candy canes sugar plum I love soufflé. Jelly
              beans sweet roll shortbread wafer shortbread. Shortbread caramels
              I love I love bear claw jelly beans. Danish liquorice halvah
              brownie I love cookie dessert brownie jelly beans.
            </p>
          </blockquote>

          <br />
          <br />

          <h2>Section title 1</h2>
          <p>
            Cupcake ipsum dolor sit amet fruitcake powder fruitcake dragée. Oat
            cake sweet roll tootsie roll sesame snaps dragée candy gummies.
            Toffee jujubes candy jujubes bear claw jujubes. Gingerbread cupcake
            candy canes sugar plum I love soufflé. Jelly beans sweet roll
            shortbread wafer shortbread. Shortbread caramels I love I love bear
            claw jelly beans. Danish liquorice halvah brownie I love cookie
            dessert brownie jelly beans.
          </p>
          <p>
            Gummies liquorice icing gummies tootsie roll. Donut cake tart
            lollipop lollipop jelly-o dragée tiramisu liquorice. Cotton candy
            chupa chups soufflé jujubes marzipan caramels apple pie. Shortbread
            tootsie roll oat cake I love bonbon pastry. Apple pie halvah I love
            I love I love bear claw gummies wafer pastry. Caramels chocolate
            cake brownie biscuit bonbon. Dessert I love oat cake I love chupa
            chups carrot cake. Cotton candy caramels lollipop powder gummi bears
            gingerbread topping chupa chups tootsie roll. Biscuit fruitcake
            toffee fruitcake donut donut sweet roll. Cake cake jelly beans
            gummies apple pie tart chocolate bar powder pie.
          </p>
        </Column>
      </Grid>
    </article>
  </div>
);

export default ProjectPage;
