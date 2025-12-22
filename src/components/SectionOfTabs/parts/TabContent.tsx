import React from 'react';
import { CustomTile } from 'enjanga-components-library';
import 'enjanga-components-library/custom-tile.css'; // Styling for <CustomT** /> component
import { ContentModel2, ContextType2 } from '@utils/dataProcessing/types';
import { CP_nameType } from 'enjanga-components-library';
import { IntroTextSkeleton } from '@/app/ui/Skeleton';
import { enjGetLayout } from '@libs/layouts';

interface SectionTabContentProps {
  tab: ContentModel2;
  panel: ContextType2;
  className?: string;
}

const SectionTabContent = ({
  tab,
  panel,
  className,
}: SectionTabContentProps) => {

  const itemMaxWidth = 350;
  const gridGap = 0.7;
  const tabContentWidth = itemMaxWidth * 2 + (gridGap * 16); // itemMaxWidth * 2 + gridGap
  // layoutTabContentGridStyle
  const lTCGridStyle = React.useMemo(() => {
    return {
      ...enjGetLayout({ type: 'RAM', itemMaxWidth: itemMaxWidth, gridGap: gridGap }),
      maxWidth: `${tabContentWidth}px`,
    };
  }, [tabContentWidth, itemMaxWidth, gridGap]);

  return (
    <div className={className}>
      <div 
      //lg={5} md={6} sm={4}
      >
        {tab?.title && (
          <article className="intro-text">
            <h3>{tab?.title}</h3>
            <p>{tab?.blurb}</p>
          </article>
        )}
        {!tab?.title && <IntroTextSkeleton />}
      </div>
      <div 
      //lg={{ span: 10, offset: 6 }} md={8} sm={4}
      >
        <div style={lTCGridStyle}>
          {panel?.items?.map((panelItem, index) => (
            <CustomTile
              key={panelItem?.sys?.id ?? index}
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
          ))}
        </div>
      </div>
    </div>
  )
};


export default SectionTabContent;
