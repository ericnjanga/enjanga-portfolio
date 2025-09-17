// import styles from './_appFooter.module.scss';
import './_appFooter.scss';
import { Content, Grid, Column } from '@carbon/react';
import { AppUseUtility } from '@utils/UtilityContext';
// ENJ NPM component library
import {
  CMSRichText,
  BrandLogo,
  ContactButton,
} from 'enjanga-components-library';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';

const AppFooter = () => {
  const { brand } = AppUseUtility();

  return (
    <footer className="app-footer">
      <Content>
        <Grid className="app-footer__wrapper">
          <Column lg={4} md={3} sm={4} className="app-footer__col1">
            <BrandLogo value={brand.name} className="app-footer__logo" />
          </Column>

          <Column lg={12} md={5} sm={4} className="app-footer__col2">
            <Grid className="">
              <Column lg={12} md={4} sm={4} className="app-footer__col2-row1">
                <Grid>
                  <ContentfulFetcher dataFor="List of Footer Links">
                    {({ orderedItems }) => {
                      return orderedItems?.map((item) => {
                        return (
                          <Column key={item?.sys.id} lg={4} md={4} sm={4}>
                            <CMSRichText data={item?.description} />
                          </Column>
                        );
                      });
                    }}
                  </ContentfulFetcher>
                </Grid>
              </Column>

              <Column lg={12} md={4} sm={4} className="">
                <hr />
              </Column>

              <Column lg={12} md={4} sm={4} className="">
                <Grid className="tabs-group-content">
                  <Column lg={8} md={4} sm={4} className="copyright">
                    <ContentfulFetcher dataFor="Footer Copyright">
                      {({ richDescription }) => (
                        <CMSRichText data={richDescription} />
                      )}
                    </ContentfulFetcher>
                  </Column>

                  {/* Col 2: Row 2: Col 2 */}
                  {/* <Column lg={4} md={4} sm={4} className="">
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
                  </Column> */}
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
