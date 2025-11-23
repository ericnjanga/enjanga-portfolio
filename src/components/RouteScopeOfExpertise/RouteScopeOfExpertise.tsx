import SectionOfTabs from '../SectionOfTabs';
import { ContentModel2 } from '@utils/dataProcessing/types';
import './styles/index.scss';

export default function RouteScopeOfExpertise({
  items,
}: {
  items: ContentModel2[];
}) {
  return (
    <section
      className="pageSection smt-box section-expertises"
      id="scope-of-expertise"
      aria-labelledby="scope-of-expertise-heading"
      tabIndex={-1} // Make focusable by default
    >
      <SectionOfTabs
        title="Scope of Expertise"
        className="expertise-section-tabs-wrapper"
        listOfItems={items}
      />
    </section>
  );
}
