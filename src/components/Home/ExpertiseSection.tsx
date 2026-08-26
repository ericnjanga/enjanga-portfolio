import type { ExpertiseSectionData } from '@/lib/contentful/models';
import ArrowLink from './ArrowLink';
import InteractiveImage from './InteractiveImage';
import styles from './Home.module.css';

export default function ExpertiseSection({
  data,
}: {
  data: ExpertiseSectionData;
}) {
  return (
    <section id="expertise" className={styles.expertise}>
      <div className={styles.expertiseCopy}>
        <h2>{data.title}</h2>
        <ul className={styles.expertiseList}>
          {data.expertiseItemsCollection.items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
        {data.cta && <ArrowLink link={data.cta} />}
      </div>

      {data.image && (
        <div className={styles.productImage}>
          <InteractiveImage
            image={data.image}
            alt={data.imageAltText}
            link={data.cta}
            interactionLabel={data.cta?.label}
          />
        </div>
      )}
    </section>
  );
}
