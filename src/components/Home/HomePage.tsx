import type { HomePageData } from '@/lib/contentful/models';
import AboutSection from './AboutSection';
import ExpertiseSection from './ExpertiseSection';
import Hero from './Hero';
import styles from './Home.module.css';

export default function HomePage({ data }: { data: HomePageData }) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Hero data={data.hero} />
        <ExpertiseSection data={data.expertiseSection} />
        <AboutSection data={data.aboutSection} />
      </div>
    </main>
  );
}
