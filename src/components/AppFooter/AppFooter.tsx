// import styles from './_appFooter.module.scss';
import './_appFooter.scss';
import { Content, Grid, Column } from '@carbon/react';
// ENJ NPM component library
import {
  CMSRichText,
  useContainerSize,
} from 'enjanga-components-library';
import ContentfulDataProvider from '@/libs/contentful/dataProvider';
import { contentfulContentIds } from '@/libs/contentful/contentful-queryConfig';
import { GlobalNav } from '../GlobalMenus';

const AppFooter = () => { 
  const { containerRef, activeBreakpoint } = useContainerSize();

  const footerIds = [
    contentfulContentIds.singleEntries['Footer QR code text'],
    contentfulContentIds.singleEntries['Footer links (Navigation)'],
    contentfulContentIds.singleEntries['Footer links (Published Work)'],
    contentfulContentIds.singleEntries['Footer QR code'],
  ];

  return (
    <footer className="app-footer" ref={containerRef as React.RefObject<HTMLElement>}>
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
            <h3>Navigation</h3>
            <ul>
              <GlobalNav parent='footer' />
            </ul>
          </Column>
          <Column xlg={3} lg={4} md={4} sm={4}>
            <ContentfulDataProvider dataFor="FooterLinks --Entry--" contentId={footerIds[2]}>
              {({ item }) => (
                <CMSRichText data={item?.description} />
              )}
            </ContentfulDataProvider>
          </Column>

        </Grid>
      </Content>
    </footer>
  );
};

export default AppFooter;
