import { TabPanels, TabPanel } from '@carbon/react';
import { IB_propsType } from '@/libs/contentful/types';
import SectionTabContent from './TabContent';
import { CustomTile } from 'enjanga-components-library';
import { Grid, Column } from '@carbon/react';

interface SectionTabPanelsProps {
  className?: string;
  listOfItems?: IB_propsType[];
}

const SectionTabPanels = ({ listOfItems }: SectionTabPanelsProps) => {
  if (!listOfItems) {
    return <TabPanelsSkeleton />;
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

/**
 * TODO: Move this skeleton somewhere else
 * @returns
 */
const TabPanelsSkeleton = () => (
  <Grid>
    <Column lg={5} md={4} sm={4}>
      <CustomTile
        featuredText={{
          heading: {},
          smartText: {},
        }}
      />
    </Column>
    <Column lg={5} md={4} sm={4}>
      <CustomTile
        featuredText={{
          heading: {},
          smartText: {},
        }}
      />
    </Column>
    <Column lg={5} md={4} sm={4}>
      <CustomTile
        featuredText={{
          heading: {},
          smartText: {},
        }}
      />
    </Column>
  </Grid>
);

export default SectionTabPanels;
