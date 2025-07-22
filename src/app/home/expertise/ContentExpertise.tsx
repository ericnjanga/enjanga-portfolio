'use client';

// components/Tabs.tsx
import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@carbon/react';
import { User, Settings, Code, Dashboard } from '@carbon/icons-react';
import Expertise1Tab from './Expertise1Tab';
import Expertise2Tab from './Expertise2Tab';
import Expertise3Tab from './Expertise3Tab';
import Expertise4Tab from './Expertise4Tab';
import Expertise5Tab from './Expertise5Tab';
import './../../styles/_grid-of-customTiles.scss';

interface ExpertiseTabs {
  className: string;
}

const ExpertiseTabs = ({ className }: ExpertiseTabs) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <Tabs
      selectedIndex={selectedTabIndex}
      onChange={({ selectedIndex }) => setSelectedTabIndex(selectedIndex)}
    >
      <TabList aria-label="Example tabs" className={className}>
        <Tab renderIcon={Dashboard}>Front-end Development</Tab>
        <Tab renderIcon={User}>Prototyping</Tab>
        <Tab renderIcon={Settings}>Design Systems</Tab>
        <Tab renderIcon={Settings}>Collaboration</Tab>
        <Tab renderIcon={Settings}>Tooling</Tab>
      </TabList>
      <TabPanels>
        <TabPanel className="grid-of-customTiles grid-of-customTiles-2 grid-of-customTiles-padding">
          <div className="tab-content">
            <Expertise1Tab />
          </div>
        </TabPanel>
        <TabPanel className="grid-of-customTiles grid-of-customTiles-2 grid-of-customTiles-padding">
          <div className="tab-content">
            <Expertise2Tab />
          </div>
        </TabPanel>
        <TabPanel className="grid-of-customTiles grid-of-customTiles-2 grid-of-customTiles-padding">
          <div className="tab-content">
            <Expertise3Tab />
          </div>
        </TabPanel>
        <TabPanel className="grid-of-customTiles grid-of-customTiles-2 grid-of-customTiles-padding">
          <div className="tab-content">
            <Expertise4Tab />
          </div>
        </TabPanel>
        <TabPanel className="grid-of-customTiles grid-of-customTiles-2 grid-of-customTiles-padding">
          <div className="tab-content">
            <Expertise5Tab />
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

// export default ExpertiseTabs;

const ContentExpertise = ({ className }: ExpertiseTabs) => (
  <>
    <ExpertiseTabs className={className} />
  </>
);

export default ContentExpertise;
