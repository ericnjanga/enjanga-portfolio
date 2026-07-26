import './_appFooter.scss';

import { Content } from '@carbon/react';
// ENJ NPM component library
import { CMSRichText } from 'enjanga-components-library';
import { useDataDistributorData } from '@utils/context/DataDistributorContext';

const AppFooter = () => {
  const { footer: footerData } = useDataDistributorData();

  return (
    <footer className="app-footer section-spacing-wrapper">
      <Content>
        <div className="enj-container">
          <div className="app-footer__wrapper"> 
            <CMSRichText className="app-footer__text" data={footerData[1]?.item?.description} />
            <hr />
            <CMSRichText className="app-footer__copyright" data={footerData[0]?.item?.description} />
          </div>
        </div>
      </Content>
    </footer>
  );
};

export default AppFooter;
