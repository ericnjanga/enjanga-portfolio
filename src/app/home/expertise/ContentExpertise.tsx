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
        <TabPanel>
          <div className="tab-content">
            <Expertise1Tab />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tab-content">
            <Expertise2Tab />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tab-content">
            <Expertise3Tab />
          </div>
        </TabPanel>
        <TabPanel>
          <div className="tab-content">
            <Expertise4Tab />
          </div>
        </TabPanel>
        <TabPanel>
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

  // <Tabs>
  //     <TabList aria-label="Example tabs">
  //       <Tab renderIcon={User}>Profile</Tab>
  //       <Tab renderIcon={Code}>Projects</Tab>
  //       <Tab renderIcon={Settings}>Settings</Tab>
  //     </TabList>
  //     <TabPanels>
  //       <TabPanel>
  //         <p>Profile content goes here</p>
  //       </TabPanel>
  //       <TabPanel>
  //         <p>Projects content goes here</p>
  //       </TabPanel>
  //       <TabPanel>
  //         <p>Settings content goes here</p>
  //       </TabPanel>
  //     </TabPanels>
  //   </Tabs>

  // <Grid className="tabs-group-content">
  //   <Column lg={7} md={4} sm={4} className="expertise__tab-content">
  //     <p>???</p>

  //     <Tabs defaultSelectedIndex={0}>
  //       <TabList className="tabs-group" aria-label="List of expertises">
  //         <Tab>Front-end development</Tab>
  //         <Tab>Prototyping</Tab>
  //         <Tab>Design Systems</Tab>
  //         <Tab>Collaboration</Tab>
  //       </TabList>
  //       <TabPanels>
  //         <TabPanel>
  //           <Grid className="tabs-group-content">
  //             <Column md={4} lg={7} sm={4} className="expertise__tab-content">
  //               <h3 className="expertise__subheading">11111111</h3>
  //               <p className="expertise__p">???????</p>
  //             </Column>
  //             <Column md={4} lg={{ span: 8, offset: 8 }} sm={4}>
  //               ******** image ********
  //             </Column>
  //           </Grid>
  //         </TabPanel>
  //         <TabPanel>
  //           <Grid className="tabs-group-content">
  //             <Column lg={16} md={8} sm={4} className="expertise__tab-content">
  //               <h3 className="expertise__subheading">11111111</h3>
  //               <p className="expertise__p">???????</p>
  //             </Column>
  //           </Grid>
  //         </TabPanel>
  //         <TabPanel>
  //           <Grid className="tabs-group-content">
  //             <Column lg={16} md={8} sm={4} className="expertise__tab-content">
  //               <h3 className="expertise__subheading">11111111</h3>
  //               <p className="expertise__p">???????</p>
  //             </Column>
  //           </Grid>
  //         </TabPanel>
  //         <TabPanel>
  //           <Grid className="tabs-group-content">
  //             <Column lg={16} md={8} sm={4} className="expertise__tab-content">
  //               <h3 className="expertise__subheading">11111111</h3>
  //               <p className="expertise__p">???????</p>
  //             </Column>
  //           </Grid>
  //         </TabPanel>
  //       </TabPanels>
  //     </Tabs>

  //     <p>???</p>
  //   </Column>
  // </Grid>
);

export default ContentExpertise;
