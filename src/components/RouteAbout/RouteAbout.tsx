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
    <BackgroundSection
      className="pageSection aboutSection smt-box"
      id="about-me"
      ariaLabelledby="about-me-heading"
      tabIndex={-1} // Make focusable by default
      imageUrl={bgImgUrl}
      parallax={true}>
      <ListOfItems {...items} />
    </BackgroundSection>
  );
};

export default RouteAbout;
