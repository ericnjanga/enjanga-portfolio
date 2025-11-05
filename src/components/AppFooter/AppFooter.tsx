// import styles from './_appFooter.module.scss';
import './_appFooter.scss';
import { Content, Grid, Column } from '@carbon/react';
import { AppUseUtility } from '@utils/UtilityContext';
// ENJ NPM component library
import {
  CMSRichText,
  BrandLogo,
} from 'enjanga-components-library';
import ContentfulDataProvider from '@/libs/contentful/dataProvider';

const AppFooter = () => {
  const { brand } = AppUseUtility();

  // I need column sizes to vary
  const setColSize = (index: number) => {
    switch(index) {
      case 0: return 3;
      case 1: return 5;
      case 2: return 4;
    }
    return 2;
  }

  return (
    <footer className="app-footer">
      <Content>
        <Grid className="app-footer__wrapper">
          <Column lg={4} md={3} sm={4} className="app-footer__logo-wrapper">
            <BrandLogo value={brand.name} className="app-footer__logo" />
          </Column>

          <Column lg={12} md={5} sm={4}>
            <Grid>
              <Column lg={12} md={4} sm={4}>
                <Grid className="app-footer__list-links">
                  <ContentfulDataProvider dataFor="FooterLinks Entry Collection">
                    {({ items }) => {
                      return items?.map((item, index) => {
                        return (
                          <Column key={item?.sys?.id} lg={setColSize(index)} md={4} sm={4}>
                            <CMSRichText data={item?.description} />
                          </Column>
                        );
                      });
                    }}
                  </ContentfulDataProvider>
                </Grid>
              </Column>

              <Column lg={12} md={4} sm={4}>
                <hr />
              </Column>

              <Column lg={12} md={4} sm={4}>
                <Grid>
                  <Column lg={8} md={4} sm={4} className="copyright">
                    <ContentfulDataProvider dataFor="FooterCopyright Entry">
                      {({ item }) => (
                        <CMSRichText data={item?.description} />
                      )}
                    </ContentfulDataProvider>
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
