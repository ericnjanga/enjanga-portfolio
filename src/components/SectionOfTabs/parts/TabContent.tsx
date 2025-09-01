import { CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';
import { ContentfulFetcher } from '@/libs/ContentfulFetcher';
import { InformationBlock } from '@/libs/CMS-content-types';
import { CP_nameType } from 'enjanga-next-3-components-lib';

interface SectionTabContentProps {
  tab: InformationBlock;
  className?: string;
}

const SectionTabContent = ({ tab, className }: SectionTabContentProps) => (
  <Grid className={className}>
    <Column lg={5} md={6} sm={4}>
      <article className="intro-text">
        <h3>{tab.title}</h3>
        <p>{tab.blurb}</p>
      </article>
    </Column>
    <Column lg={{ span: 10, offset: 6 }} md={8} sm={4}>
      <Grid className="tabs-group-content">
        <ContentfulFetcher
          dataFor="InfoBlock by parentId"
          contentId={tab.sys.id}
        >
          {({ orderedItems }) => {
            return orderedItems?.map((tab) => (
              <Column key={tab.sys.id} lg={5} md={4} sm={4}>
                <CustomTile
                  featuredText={{
                    heading: {
                      children: tab.title,
                      level: 4,
                    },
                    smartText: {
                      plainText: tab.blurb,
                    },
                  }}
                  layoutStyle="card"
                  modalIsAvailable={false}
                  media="pictogram"
                  mediaPictogram={
                    tab?.icon
                      ? (tab.icon as CP_nameType)
                      : ('App Developer' as CP_nameType)
                  }
                  // modalRichDescription={tab.description}
                />
              </Column>
            ));
          }}
        </ContentfulFetcher>
      </Grid>
    </Column>
  </Grid>
);

export default SectionTabContent;
