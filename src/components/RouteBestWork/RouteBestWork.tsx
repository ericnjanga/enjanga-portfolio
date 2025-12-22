import ListOfItems from './ListOfItems';
import { ContentModel3 } from '@utils/dataProcessing/types';

type RouteBestWorkType = {
  items: ContentModel3[];
};

const RouteBestWork = ({ items }: RouteBestWorkType) => (
  <div className='enj-container'>
    <div 
    //lg={16} md={8} sm={4}
    >
      <section
        className="pageSection smt-box"
        id="best-work"
        aria-labelledby="best-work-heading"
        tabIndex={-1} // Make focusable by default
      >
        <h2 id="best-work-heading" className="sectionTitle">
          Best Work
        </h2>
        <ListOfItems items={items} />
      </section>
    </div>
  </div>
);

export default RouteBestWork;
