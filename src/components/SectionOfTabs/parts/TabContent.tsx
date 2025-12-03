import { CustomTile } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';
import { ContentModel2, ContextType2 } from '@utils/dataProcessing/types';
import { CP_nameType } from 'enjanga-components-library';
import { IntroTextSkeleton } from '@/app/ui/Skeleton';

interface SectionTabContentProps {
  tab: ContentModel2;
  panel: ContextType2;
  className?: string;
}

const SectionTabContent = ({
  tab,
  panel,
  className,
}: SectionTabContentProps) => (
  <Grid className={className}>
    <Column lg={5} md={6} sm={4}>
      {tab?.title && (
        <article className="intro-text">
          <h3>{tab?.title}</h3>
          <p>{tab?.blurb}</p>
        </article>
      )}
      {!tab?.title && <IntroTextSkeleton />}
    </Column>
    <Column lg={{ span: 10, offset: 6 }} md={8} sm={4}>
      <Grid className="enj-gridSys__cols-wrapper">
        {panel?.items?.map((panelItem, index) => (
          <Column key={panelItem?.sys?.id ?? index} lg={5} md={4} sm={4}>
            <CustomTile
              featuredText={{
                heading: {
                  children: panelItem?.title,
                  level: 4,
                },
                smartText: {
                  plainText: panelItem?.blurb,
                },
              }}
              layoutStyle="card"
              modalIsAvailable={false}
              media="pictogram"
              mediaPictogram={
                panelItem?.icon
                  ? (panelItem?.icon as CP_nameType)
                  : ('App Developer' as CP_nameType)
              }
            />
          </Column>
        ))}
      </Grid>
    </Column>
  </Grid>
);


export default SectionTabContent;
