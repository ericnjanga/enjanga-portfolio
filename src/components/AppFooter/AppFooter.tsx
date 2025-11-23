import './_appFooter.scss';
import { Content, Grid, Column } from '@carbon/react';
// ENJ NPM component library
import {
  CMSRichText,
  useContainerSize,
} from 'enjanga-components-library';
import { GlobalNav } from '../GlobalMenus';
import { useFooterData } from '@utils/context/FooterContext';

const AppFooter = () => { 
  const { containerRef, activeBreakpoint } = useContainerSize();
  const footerData = useFooterData();

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
              <CMSRichText data={footerData[1]?.item?.description} />
            </Column>
          )} 

          <Column xlg={4} lg={4} md={4} sm={4}>
            <CMSRichText data={footerData[0]?.item?.description} />
          </Column>

          
          {/** Only on larger screens:
           * --------------------
           * Render supporting text "after" the QR code
           */}
          {activeBreakpoint!=='md' && (
            <Column sm={4}> 
              <CMSRichText data={footerData[1]?.item?.description} />
            </Column>
          )}

          <Column xlg={{ span: 3, offset: 10 }} lg={{ span: 4, offset: 8 }} md={4} sm={4}>
            <h3>Navigation</h3>
            <ul>
              <GlobalNav parent='footer' />
            </ul>
          </Column>
          <Column xlg={3} lg={4} md={4} sm={4}>
            <CMSRichText data={footerData[2]?.item?.description} />
          </Column>

        </Grid>
      </Content>
    </footer>
  );
};

export default AppFooter;
