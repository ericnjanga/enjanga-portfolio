import { CustomTile } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import { ContentfulDataProvider } from '@/libs/contentful/dataProvider';
import { EntryGroup2_propsType } from '@/libs/contentful/types';
import { CP_nameType } from 'enjanga-components-library';

interface SectionTabContentProps {
  tab: EntryGroup2_propsType;
  className?: string;
}

const SectionTabContent = ({ tab, className }: SectionTabContentProps) => (
  <Grid className={className}>
    <Column lg={5} md={6} sm={4}>
      {tab?.title && (
        <article className="intro-text">
          <h3>{tab?.title}</h3>
          <p>{tab?.blurb}</p>
        </article>
      )}
      {!tab?.title && (
        <IntroTextSkeleton />
      )}
      
    </Column>
    <Column lg={{ span: 10, offset: 6 }} md={8} sm={4}>
      <Grid className="tabs-group-content">
        <ContentfulDataProvider
          dataFor="scopeOfExp Entry Collection"
          contentId={tab?.sys?.id}
        >
          {({ items }) => {
            return items?.map((item, index) => (
              <Column key={item?.sys?.id ?? index} lg={5} md={4} sm={4}>
                <CustomTile
                  featuredText={{
                    heading: {
                      children: item.title,
                      level: 4,
                    },
                    smartText: {
                      plainText: item.blurb,
                    },
                  }}
                  layoutStyle="card"
                  modalIsAvailable={false}
                  media="pictogram"
                  mediaPictogram={
                    item?.icon
                      ? (item.icon as CP_nameType)
                      : ('App Developer' as CP_nameType)
                  }
                />
              </Column>
            ));
          }}
        </ContentfulDataProvider>
      </Grid>
    </Column>
  </Grid>
);






/**
 * TODO: Move this skeleton somewhere else
 * @returns
 */
const IntroTextSkeleton = () => (
  <div className="skeleton-text-wrapper">
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '100%' }}></p>
  </div>
);

export default SectionTabContent;
