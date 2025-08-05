import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { User, Settings, Code, Dashboard } from '@carbon/icons-react';
import { InformationBlock } from '@/libs/CMS-content-types';
import SectionTabContent from './TabContent';

interface SectionTabPanelsProps {
  className?: string;
  listOfItems?: InformationBlock[];
}

const SectionTabPanels = ({
  listOfItems,
  className,
}: SectionTabPanelsProps) => {
  if (!listOfItems) {
    return (
      <div className="skeleton-animation">Skeleton - SectionTabPanels</div>
    );
  }

  return (
    <TabPanels>
      {listOfItems?.map((item) => (
        <TabPanel
          key={item.sys.id}
          className="grid-of-customTiles grid-of-customTiles-2 grid-of-customTiles-padding"
        >
          <div className="tab-content">
            <SectionTabContent tab={item} />
          </div>
        </TabPanel>
      ))}
    </TabPanels>
  );
};

export default SectionTabPanels;
