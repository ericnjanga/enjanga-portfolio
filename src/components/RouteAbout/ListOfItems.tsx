import { TilePictogram } from 'enjanga-components-library';
import 'enjanga-components-library/tile-variants.css'; // Styling for <CustomT** /> component
import 'enjanga-components-library/content-modal.css'; // Styling for <ContentMod** /> component (<CustomT** /> is triggering <ContentMod** /> in thid case)
import 'enjanga-components-library/cms-rich-text.css'; // Styling for <ContentMod** /> contains (<CMSRichTe** /> component)
import { CP_nameType } from 'enjanga-components-library';
import type { ContentModel2 } from '@utils/dataProcessing/types';

const ListOfItems = (items: ContentModel2[]) => {
  const card1 = items && items[0];
  const card2 = items && items[1];
  const card3 = items && items[2];

  return (
    <section className="enj-container">
      <div className="tiles-wrapper">
          <TilePictogram
            className="tile1"
            featuredText={{
              heading: {
                children: card1?.title,
                level: 3,
              },
              smartText: {
                plainText: card1?.blurb,
              },
            }}
            modal={{
              richDescription: card1?.description
            }}
            pictogram={card1?.icon as CP_nameType}
          /> 

          <TilePictogram
            className="tile2"
            featuredText={{
              heading: {
                children: card2?.title,
                level: 3,
              },
              smartText: {
                plainText: card2?.blurb,
              },
            }}
            modal={{
              richDescription: card2?.description
            }}
            pictogram={card2?.icon as CP_nameType}
          /> 

          <TilePictogram
            className="tile3"
            featuredText={{
              heading: {
                children: card3?.title,
                level: 3,
              },
              smartText: {
                plainText: card3?.blurb,
              },
            }}
            modal={{
              richDescription: card3?.description
            }}
            pictogram={card3?.icon as CP_nameType}
          /> 

        {/* <TilePictogram
          className=""
          featuredText={{
            heading: {
              children: card1?.title,
              level: 3,
            },
            smartText: {
              plainText: card1?.blurb,
            },
          }}
          // layoutStyle="card"
          // modalIsAvailable={true}
          // modalRichDescription={card1?.description}
          // media="pictogram"
          // mediaPictogram={card1?.icon as CP_nameType}
        /> */}

        {/* <TilePictogram
          className=""
          featuredText={{
            heading: {
              children: card2?.title,
              level: 3,
            },
            smartText: {
              plainText: card2?.blurb,
            },
          }}
          layoutStyle="card"
          modalIsAvailable={true}
          modalRichDescription={card2?.description}
          media="pictogram"
          mediaPictogram={card2?.icon as CP_nameType}
        />

        <TilePictogram
          className=""
          featuredText={{
            heading: {
              children: card3?.title,
              level: 3,
            },
            smartText: {
              plainText: card3?.blurb,
            },
          }}
          layoutStyle="card"
          modalIsAvailable={true}
          modalRichDescription={card3?.description}
          media="pictogram"
          mediaPictogram={card3?.icon as CP_nameType}
        /> */}
      </div>
    </section>
  );
};

export default ListOfItems;
