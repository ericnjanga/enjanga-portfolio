import { Tab, TabList } from '@carbon/react';
import { User, Settings, Code, Dashboard } from '@carbon/icons-react';
import { InformationBlock } from '@/libs/CMS-content-types';

interface SectionTabsListProps {
  className?: string;
  listOfItems?: InformationBlock[];
}

const SectionTabsList = ({ listOfItems, className }: SectionTabsListProps) => {
  if (!listOfItems) {
    return <div className="skeleton-animation">Skeleton - SectionTabsList</div>;
  }

  return (
    <TabList aria-label="List of expertises" className={className}>
      {listOfItems?.map((item) => (
        <Tab key={item.sys.id} renderIcon={Dashboard}>
          {item.title}
        </Tab>
      ))}
    </TabList>
  );
};

export default SectionTabsList;
