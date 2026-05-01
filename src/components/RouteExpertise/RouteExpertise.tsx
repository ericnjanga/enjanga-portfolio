import SectionOfTabs from '../SectionOfTabs';
import { ContentModel2 } from '@utils/dataProcessing/types';
import './styles/index.scss';

export default function RouteExpertise({
  items,
}: {
  items: ContentModel2[];
}) {
  return (
    <section
      className="pageSection smt-box section-expertises"
      id="expertise"
      aria-labelledby="expertise-heading"
      tabIndex={-1} // Make focusable by default
    >
      <SectionOfTabs
        title="How I Deliver Value"
        className="expertise-section-tabs-wrapper"
        listOfItems={items}
      />
    </section>
  );
}
