'use client';

// components/Tabs.tsx
import React, { useState } from 'react';
import { Tabs } from '@carbon/react';
import '@/styles/articlePage.module.scss';
import './_SectionOfTabs.scss';
import { Grid, Column } from '@carbon/react';
import { InformationBlock } from '@/libs/CMS-content-types';
import SectionTabsList from './parts/tabsList';
import SectionTabPanels from './parts/tabPanels';

interface SectionOfTabsProps {
  title: string;
  className: string;
  listOfItems?: InformationBlock[];
}
interface TabsProps {
  title: string;
  className: string;
}

const SectionOfTabs = ({
  className,
  title,
  listOfItems,
}: SectionOfTabsProps) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <Grid className="SectionOfTabs">
      {' '}
      {/*  fullWidth */}
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <h2 id="scope-of-expertise-heading" className="sectionTitle">
          {title}
        </h2>

        <Tabs
          selectedIndex={selectedTabIndex}
          onChange={({ selectedIndex }) => setSelectedTabIndex(selectedIndex)}
        >
          <SectionTabsList className={className} listOfItems={listOfItems} />
          <SectionTabPanels listOfItems={listOfItems} />
        </Tabs>
      </Column>
    </Grid>
  );
};

export default SectionOfTabs;
