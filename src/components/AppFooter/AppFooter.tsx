// import styles from './_appFooter.module.scss';
import './_appFooter.scss';
import { Content, Grid, Column } from '@carbon/react';
// ENJ NPM component library
import {
  CMSRichText,
  BrandLogo,
  useContainerSize,
} from 'enjanga-components-library';
import ContentfulDataProvider from '@/libs/contentful/dataProvider';
import { contentfulContentIds } from '@/libs/contentful/contentful-queryConfig';

const AppFooter = () => { 
  const { containerRef, activeBreakpoint } = useContainerSize();

  const footerIds = [
    contentfulContentIds.singleEntries['Footer QR code text'],
    contentfulContentIds.singleEntries['Footer links (Navigation)'],
    contentfulContentIds.singleEntries['Footer links (Published Work)'],
    contentfulContentIds.singleEntries['Footer QR code'],
  ];


  return (
    <footer className="app-footer" ref={containerRef}>
      <Content>
        <Grid className="app-footer__wrapper">
          {/** Only on smaller screens:
           * --------------------
           * Render supporting text "before" the QR code
           */}
          {activeBreakpoint==='md' && (
            <Column sm={4}> 
              <ContentfulDataProvider dataFor="FooterLinks --Entry--" contentId={footerIds[0]}>
                {({ item }) => (
                  <CMSRichText data={item?.description} />
                )}
              </ContentfulDataProvider>
            </Column>
          )} 

          <Column xlg={4} lg={4} md={4} sm={4}>
            <ContentfulDataProvider dataFor="FooterLinks --Entry--" contentId={footerIds[3]}>
              {({ item }) => (
                <CMSRichText data={item?.description} />
              )}
            </ContentfulDataProvider>
          </Column>

          
          {/** Only on larger screens:
           * --------------------
           * Render supporting text "after" the QR code
           */}
          {activeBreakpoint!=='md' && (
            <Column sm={4}> 
              <ContentfulDataProvider dataFor="FooterLinks --Entry--" contentId={footerIds[0]}>
                {({ item }) => (
                  <CMSRichText data={item?.description} />
                )}
              </ContentfulDataProvider>
            </Column>
          )}

          <Column xlg={{ span: 3, offset: 10 }} lg={{ span: 4, offset: 8 }} md={4} sm={4}>
            <ContentfulDataProvider dataFor="FooterLinks --Entry--" contentId={footerIds[1]}>
              {({ item }) => (
                <CMSRichText data={item?.description} />
              )}
            </ContentfulDataProvider>
          </Column>
          <Column xlg={3} lg={4} md={4} sm={4}>
            <ContentfulDataProvider dataFor="FooterLinks --Entry--" contentId={footerIds[2]}>
              {({ item }) => (
                <CMSRichText data={item?.description} />
              )}
            </ContentfulDataProvider>
          </Column>
          {/* <Column lg={4} md={3} sm={4} className="app-footer__logo-wrapper">
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
          </Column> */}
        </Grid>
      </Content>
    </footer>
  );
};

export default AppFooter;
