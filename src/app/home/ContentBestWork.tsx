import { Grid, Column } from '@carbon/react';
import { CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';

const ContentBestWork = () => (
  <Grid className="tabs-group-content">
    <Column lg={16} md={8} sm={4} className="landing-page__tab-content">
      <ContentfulFetcher dataFor="Best work list">
        {({ id, title, blurb }) => (
          <CustomTile
            linksTo={`best-work/${id}`}
            stackOrder="horizontal"
            title={title}
            text={blurb}
          />
        )}
      </ContentfulFetcher>
    </Column>
  </Grid>
);

export default ContentBestWork;
