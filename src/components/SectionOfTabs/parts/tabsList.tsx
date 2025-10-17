import {
  Code,
  LogoFigma,
  IbmIbv,
  Collaborate,
  Platforms,
} from '@carbon/icons-react';
import { Tab, TabList } from '@carbon/react';
import { ContentModel2 } from '@/libs/contentful/types'; 

interface SectionTabsListProps {
  className?: string;
  listOfItems?: ContentModel2[];
}

// map string keys from CMS to actual icon components
const iconMap: Record<string, React.ComponentType> = {
  Code,
  LogoFigma,
  IbmIbv,
  Collaborate,
  Platforms,
};

const SectionTabsList = ({ listOfItems, className }: SectionTabsListProps) => (
  <TabList aria-label="Scope of Expertise tabs" className={className}>
    {listOfItems?.map((item, index) => {
      const IconComponent = iconMap[item?.icon || ''] || Code; // fallback to Code if not found

      return (
        <Tab key={item?.sys?.id ?? index} renderIcon={IconComponent}>
          {!item?.title && <div className='skeleton skeleton-text' role="presentation" style={{ width: '115px' }}></div>}
          {item?.title}
        </Tab>
      );
    })}
  </TabList>
);

export default SectionTabsList;
