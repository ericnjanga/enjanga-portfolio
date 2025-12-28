import { TabPanels, TabPanel } from '@carbon/react';
import { ContentModel2 } from '@utils/dataProcessing/types';
import SectionTabContent from './TabContent';
import { useScopeOfExpData } from '@utils/context/ScopeOfExpContext';

interface SectionTabPanelsProps {
  className?: string;
  listOfItems?: ContentModel2[];
}

const SectionTabPanels = ({ listOfItems }: SectionTabPanelsProps) => {
  const panelData = useScopeOfExpData();

  return (
    <TabPanels>
      {listOfItems?.map((item, index) => (
        <TabPanel
          key={item?.sys?.id ?? index}
          className="tab-content-wrapper">
          <div className="tab-content">
            {panelData?.map((panel) => {
              return (
                panel.parentId === item?.sys?.id && (
                  <SectionTabContent
                    key={item?.sys?.id}
                    className="enjanga-tabpanel-xxx"
                    tab={item}
                    panel={panel?.data}
                  />
                )
              );
            })}
          </div>
        </TabPanel>
      ))}
    </TabPanels>
  );
};

export default SectionTabPanels;
