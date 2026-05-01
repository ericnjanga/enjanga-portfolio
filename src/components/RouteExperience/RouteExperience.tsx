import ListOfItems from './ListOfItems';
import type { OrganizationCollection } from '@/libs/organizations/types';

type RouteExperienceType = {
  organizations: OrganizationCollection;
};

const RouteExperience = ({ organizations }: RouteExperienceType) => (
  <div className='enj-container'>
    <div 
    //lg={16} md={8} sm={4}
    >
      <section
        className="pageSection smt-box"
        id="experience"
        aria-labelledby="experience-heading"
        tabIndex={-1} // Make focusable by default
      >
        <h2 id="experience-heading" className="sectionTitle">
          Where I`ve made an Impact
        </h2>
        <ListOfItems organizations={organizations} />
      </section>
    </div>
  </div>
);

export default RouteExperience;
