import { TabPanels, TabPanel } from '@carbon/react';
import { EntryGroup2_propsType } from '@/libs/contentful/types';
import SectionTabContent from './TabContent';

interface SectionTabPanelsProps {
  className?: string;
  listOfItems?: EntryGroup2_propsType[];
}

const SectionTabPanels = ({ listOfItems }: SectionTabPanelsProps) => {
  if (!listOfItems) {
    return <TabPanelsSkeleton />;
  }

  return (
    <TabPanels>
      {listOfItems?.map((item) => (
        <TabPanel
          key={item?.sys?.id}
          className="grid-of-customTiles grid-of-customTiles-2 grid-of-customTiles-padding">
          <div className="tab-content">
            <SectionTabContent tab={item} />
            {!item?.sys?.id && <TabPanelsSkeleton />}
          </div>
        </TabPanel>
      ))}
    </TabPanels>
  );
};

/**
 * TODO: Move this skeleton somewhere else
 * @returns
 */
const TabPanelsSkeleton = () => (
  <div className="skeleton-text-wrapper">
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '80%' }}></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '80%' }}></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '80%' }}></p>
    <p
      className="skeleton skeleton-text skeleton-bot-spacing-2"
      role="presentation"
      style={{ width: '80%' }}></p>
  </div>
);

export default SectionTabPanels;
