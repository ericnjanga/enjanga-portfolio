import { Grid, Column } from '@carbon/react';
import { CustomQuotes, CQ_quote_propsType } from 'enjanga-components-library';
import type { ContentModel1 } from '@utils/dataProcessing/types';
import './index.scss';

type WrapperQuotesType = {
  items: ContentModel1[];
};

const WrapperQuotes = ({ items }: WrapperQuotesType) => {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <section
          className="pageSection smt-box"
          id="engineer-quotes"
          aria-labelledby="best-work-heading"
          tabIndex={-1} // Make focusable by default
        >
          <h2 id="engineer-quotes-heading" style={{ display: 'none' }}>
            Quotes
          </h2>

          <CustomQuotes
            className="engineer-quotes-component"
            quotes={items as CQ_quote_propsType[]}
          />
        </section>
      </Column>
    </Grid>
  );
};

export default WrapperQuotes;
