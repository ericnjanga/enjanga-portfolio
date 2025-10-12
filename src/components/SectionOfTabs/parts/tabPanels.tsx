import { TabPanels, TabPanel } from '@carbon/react';
import { ContentModel2 } from '@/libs/contentful/types';
import SectionTabContent from './TabContent';

interface SectionTabPanelsProps {
  className?: string;
  listOfItems?: ContentModel2[];
}

const SectionTabPanels = ({ listOfItems }: SectionTabPanelsProps) => (
  <TabPanels>
    {listOfItems?.map((item, index) => (
      <TabPanel
        key={item?.sys?.id ?? index}
        className="grid-of-customTiles grid-of-customTiles-2 grid-of-customTiles-padding">
        <div className="tab-content">
          <SectionTabContent className='enjanga-tabpanel-xxx' tab={item} />
        </div>
      </TabPanel>
    ))}
  </TabPanels>
);


export default SectionTabPanels;
