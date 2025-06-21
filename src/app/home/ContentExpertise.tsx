'use client';

import { CustomTile } from 'enjanga-next-3-components-lib'; // ENJ NPM component library
import { Grid, Column } from '@carbon/react';

// import {
//   Tabs,
//   Tab,
//   TabList,
//   TabPanels,
//   TabPanel,
//   Grid,
//   Column,
// } from '@carbon/react';
import { User, Code, Settings } from '@carbon/icons-react';

const ContentExpertise = () => (
  <div>
    <Grid className="">
      <Column lg={5} md={6} sm={4} className="">
        <h3>Section title xxxx-xxxxxx</h3>
        <p>
          Cupcake ipsum dolor sit amet marshmallow I love muffin. Sesame snaps
          bonbon pudding halvah candy canes lollipop bear claw. Apple pie
          cupcake brownie oat cake candy canes gummies liquorice halvah apple
          pie.
        </p>
      </Column>
      <Column lg={{ span: 10, offset: 6 }} md={8} sm={4} className="">
        <Grid className="tabs-group-content">
          <Column lg={5} md={4} sm={4}>
            <CustomTile title="title" text="component text ..." />
          </Column>
          <Column lg={5} md={4} sm={4}>
            <CustomTile title="title" text="component text ..." />
          </Column>
          <Column lg={5} md={4} sm={4}>
            <CustomTile title="title" text="component text ..." />
          </Column>
          <Column lg={5} md={4} sm={4}>
            <CustomTile title="title" text="component text ..." />
          </Column>
        </Grid>
      </Column>
    </Grid>
  </div>
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
