import {
  Code,
  LogoFigma,
  IbmIbv,
  Collaborate,
  Platforms,
} from '@carbon/icons-react';
import { Tab, TabList } from '@carbon/react';
import { IB_propsType } from '@/libs/contentful/types';

interface SectionTabsListProps {
  className?: string;
  listOfItems?: IB_propsType[];
}

// map string keys from CMS to actual icon components
const iconMap: Record<string, React.ComponentType> = {
  Code,
  LogoFigma,
  IbmIbv,
  Collaborate,
  Platforms,
};

const SectionTabsList = ({ listOfItems, className }: SectionTabsListProps) => {
  // if (!listOfItems) {
  //   return <div className="skeleton-animation">Skeleton - SectionTabsList</div>;
  // }

  return (
    <TabList aria-label="FooterLinks Entry Collectionexpertises" className={className}>
      {listOfItems?.map((item) => {
        const IconComponent = iconMap[item?.icon || ''] || Code; // fallback to Code if not found

        /**
         * TODO:
         * 1) I've created a temporary solution to reduce item.title string size by striping anything after "&"
         * but this is just a temporary patch.
         * WHat should be done:
         * 1) Creating a "shortTitle" field inside "IB_propsType" to render shorter titles
         */
        // remove any substring that starts with "& "
        let cleanTitle = item.title.replace(/&\s.*$/, '').trim();
        return (
          <Tab key={item.sys.id} renderIcon={IconComponent}>
            {cleanTitle}
          </Tab>
        );
      })}
    </TabList>
  );
};

export default SectionTabsList;
