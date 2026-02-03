import React from 'react';
import { TilePictogram, useContainerSize, } from 'enjanga-components-library';
import 'enjanga-components-library/tile-pictogram.css'; // Styling for <CustomT** /> component
import { ContentModel2, ContextType2 } from '@utils/dataProcessing/types';
import { CP_nameType } from 'enjanga-components-library';
import { IntroTextSkeleton } from '@/app/ui/Skeleton';
import './_tabContentStyles.scss';

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
  const { containerRef, activeBreakpoint } = useContainerSize<HTMLDivElement>();

  return (
    <div className={`tab-content-inner tab-content-inner--${activeBreakpoint}`} ref={containerRef}>
      {tab?.title && (
        <article className="intro-text">
          <h3>{tab?.title}</h3>
          <p>{tab?.blurb}</p>
        </article>
      )}
      {!tab?.title && <IntroTextSkeleton />}
    
      <div className="tab-tiles-wrapper">
        {panel?.items?.map((panelItem, index) => (
          <TilePictogram
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
            pictogram={
              panelItem?.icon
                ? (panelItem?.icon as CP_nameType)
                : ('App Developer' as CP_nameType)
            }
          /> 
        ))}
      </div>
    </div>
  )
};


export default SectionTabContent;
