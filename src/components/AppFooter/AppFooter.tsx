import './_appFooter.scss';
import { Content } from '@carbon/react';
// ENJ NPM component library
import {
  CMSRichText,
  useContainerSize,
} from 'enjanga-components-library';
import { GlobalNav } from '../GlobalMenus';
import { useDataDistributorData } from '@utils/context/DataDistributorContext';

const AppFooter = () => { 
  const { containerRef, activeBreakpoint } = useContainerSize();
  const { footer: footerData } = useDataDistributorData();

  return (
    <footer className="app-footer" ref={containerRef as React.RefObject<HTMLElement>}>
      <Content>
        <div className="enj-container app-footer__wrapper">
          {/** Only on smaller screens:
           * --------------------
           * Render supporting text "before" the QR code
           */}
          {activeBreakpoint==='md' && (
            <div className='col-sm-4'> 
              <CMSRichText data={footerData[1]?.item?.description} />
            </div>
          )} 

          <div className='col-xlg-4 col-lg-4 col-md-4 col-sm-4'>
            <CMSRichText data={footerData[0]?.item?.description} />
          </div>

          
          {/** Only on larger screens:
           * --------------------
           * Render supporting text "after" the QR code
           */}
          {activeBreakpoint!=='md' && (
            <div className='col-sm-4'> 
              <CMSRichText data={footerData[1]?.item?.description} />
            </div>
          )}

          <div className='col-md-4 col-sm-4'> {/* xlg={{ span: 3, offset: 10 }} lg={{ span: 4, offset: 8 }} */}
            <h3>Navigation</h3>
            <ul>
              <GlobalNav parent='footer' />
            </ul>
          </div>
          <div className='col-xlg-3 col-lg-4 col-md-4 col-sm-4'>
            <CMSRichText data={footerData[2]?.item?.description} />
          </div>

        </div>
      </Content>
    </footer>
  );
};

export default AppFooter;
