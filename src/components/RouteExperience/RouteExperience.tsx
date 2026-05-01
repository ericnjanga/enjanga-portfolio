import ListOfItems from './ListOfItems';
import { ContentModel3 } from '@utils/dataProcessing/types';

type RouteExperienceType = {
  items: ContentModel3[];
};

const RouteExperience = ({ items }: RouteExperienceType) => (
  <div className='enj-container'>
    <div 
    //lg={16} md={8} sm={4}
    >
      <section
        className="pageSection smt-box"
        id="portfolio"
        aria-labelledby="portfolio-heading"
        tabIndex={-1} // Make focusable by default
      >
        <h2 id="portfolio-heading" className="sectionTitle">
          Where I`ve made an Impact
        </h2>
        <ListOfItems items={items} />
      </section>
    </div>
  </div>
);

export default RouteExperience;
