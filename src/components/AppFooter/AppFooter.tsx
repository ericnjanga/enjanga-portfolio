import './_appFooter.scss';

import React from 'react';
import { Content } from '@carbon/react';
// ENJ NPM component library
import {
  CMSRichText,
  useContainerSize,
} from 'enjanga-components-library';
import { GlobalNav } from '../GlobalMenus';
import { useDataDistributorData } from '@utils/context/DataDistributorContext';
import { enjGetLayout } from '@libs/layouts';

const AppFooter = () => { 
  const { containerRef, activeBreakpoint } = useContainerSize();
  const { footer: footerData } = useDataDistributorData();
    // const layoutGridStyle = React.useMemo(() => {
    //   return enjGetLayout({ type: 'RAM', itemMaxWidth: 220, gridGap: 1.8 });
    // }, []);

  return (
    <footer className="app-footer section-spacing-wrapper" ref={containerRef as React.RefObject<HTMLElement>}>
      <Content>
        <div className="enj-container">
          <div className="app-footer__wrapper"> 
            <CMSRichText className="app-footer__text" data={footerData[1]?.item?.description} />
            <hr />
            <CMSRichText className="app-footer__copyright" data={footerData[0]?.item?.description} />
          </div>

          {/* <div>
            <h3>Navigation</h3>
            <ul>
              <GlobalNav parent='footer' />
            </ul>
          </div> */}
        </div>
      </Content>
    </footer>
  );
};

export default AppFooter;
