import { BackgroundSection } from '@/components/BackgroundSection';
import type { ContentModel2 } from '@utils/dataProcessing/types'; 
import ListOfItems from './ListOfItems';
import './index.scss';

type RouteAboutType = {
  items: ContentModel2[];
  bgImgUrl: string | null;
};

const RouteAbout = ({ items, bgImgUrl }: RouteAboutType) => {
  return (
    <section>
      <div className="enj-container"><h2 id="about-heading">My approach</h2></div>
      <BackgroundSection
      className="pageSection aboutSection smt-box"
      id="about"
      ariaLabelledby="about-heading"
      tabIndex={-1} // Make focusable by default
      imageUrl={bgImgUrl}
      parallax={true}>
      <ListOfItems {...items} />
    </BackgroundSection>
    </section>
  );
};

export default RouteAbout;
