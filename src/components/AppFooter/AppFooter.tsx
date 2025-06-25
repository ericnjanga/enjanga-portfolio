import styles from './_appFooter.module.scss';
import { Content, Grid, Column } from '@carbon/react';
// ENJ NPM component library
import {
  BrandName,
  HeadlinedList,
  ContactButton,
} from 'enjanga-next-3-components-lib';
import clsx from 'clsx';

const AppFooter = () => {
  const mockData = {
    brandName: '**** ******',
    listMainNav: [
      {
        name: 'Link 1',
        href: '/dsdsdss',
      },
      {
        name: 'Link 2',
        href: '/dsdsdss',
      },
      {
        name: 'Link 3',
        href: '/dsdsdss',
      },
      {
        name: 'Link 4',
        href: '/dsdsdss',
      },
    ],
    proLinks: [
      {
        name: 'Link 1',
        href: '/dsdsdss',
      },
      {
        name: 'Link 2',
        href: '/dsdsdss',
      },
    ],
    blogLinks: [
      {
        name: 'Lemon drops croissant sesame snaps cookie jelly beans',
        href: '/dsdsdss',
      },
      {
        name: 'Liquorice liquorice fruitcake tiramisu sesame snaps',
        href: '/dsdsdss',
      },
      {
        name: 'Soufflé shortbread chupa chups lollipop carrot',
        href: '/dsdsdss',
      },
    ],
  };

  return (
    <footer className={clsx(styles.footer, 'app-footer')}>
      <Content>
        <Grid className="app-footer__wrapper">
          {/* Col 1: Logo */}
          <Column lg={4} md={3} sm={4} className="app-footer__col1">
            <BrandName />
          </Column>

          {/* Col 2: Nav + copyright */}
          <Column lg={12} md={5} sm={4} className="app-footer__col2">
            <Grid className="">
              {/* Col 2: Row 1 */}
              <Column lg={12} md={4} sm={4} className="app-footer__col2-row1">
                <Grid>
                  {/* Col 2: Row 1: Col 1 */}
                  <Column lg={4} md={4} sm={4} className="">
                    <HeadlinedList
                      heading={{ content: 'Main Navigation', h: 'h4' }}
                      list={{ content: mockData.listMainNav }}
                    />
                  </Column>

                  {/* Col 2: Row 1: Col 2 */}
                  <Column lg={4} md={4} sm={4} className="">
                    <HeadlinedList
                      heading={{ content: 'Professional Links', h: 'h4' }}
                      list={{ content: mockData.proLinks }}
                    />
                  </Column>

                  {/* Col 2: Row 1: Col 3 */}
                  <Column lg={4} md={4} sm={4} className="">
                    <HeadlinedList
                      heading={{ content: 'Blog', h: 'h4' }}
                      list={{ content: mockData.proLinks }}
                    />
                  </Column>
                </Grid>
              </Column>

              {/* Col 2: Row 1 */}
              <Column lg={12} md={4} sm={4} className="">
                <hr />
              </Column>

              {/* Col 2: Row 2 */}
              <Column lg={12} md={4} sm={4} className="">
                <Grid className="tabs-group-content">
                  {/* Col 2: Row 2: Col 1 */}
                  <Column lg={8} md={4} sm={4} className="">
                    <b>Copyright: </b> Cupcake ipsum dolor sit amet. Lemon drops
                    croissant.
                  </Column>

                  {/* Col 2: Row 2: Col 2 */}
                  <Column lg={4} md={4} sm={4} className="">
                    <ContactButton
                      btnText="Get in touch with me"
                      btnIcon="Email"
                      btnKind="primary"
                      btnSize="md"
                      modalLabel="Contact Form"
                      modalHeading="Get in touch with Eric"
                      modalSubHeading="Biscuit tootsie roll fruitcake gummies marshmallow bear claw pie cotton candy tootsie roll. "
                      modalPrimaryButtonText="Send Message"
                      modalSecondaryButtonText="Cancel"
                    />
                  </Column>
                </Grid>
              </Column>
            </Grid>
          </Column>
        </Grid>
      </Content>
    </footer>
  );
};

export default AppFooter;
