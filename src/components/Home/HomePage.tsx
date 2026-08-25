import type { HomePageData } from '@/lib/contentful/models';
import AboutSection from './AboutSection';
import ExpertiseSection from './ExpertiseSection';
import Hero from './Hero';
import ScrollReveal from './ScrollReveal';
import styles from './Home.module.css';

export default function HomePage({ data }: { data: HomePageData }) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Hero data={data.hero} />
        <ScrollReveal>
          <ExpertiseSection data={data.expertiseSection} />
        </ScrollReveal>
        <ScrollReveal>
          <AboutSection data={data.aboutSection} />
        </ScrollReveal>
      </div>
    </main>
  );
}
