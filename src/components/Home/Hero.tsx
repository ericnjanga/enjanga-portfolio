import { PageHero } from 'enjanga-components-library';
import type { HeroData } from '@/lib/contentful/models';
import styles from './Home.module.css';

export default function Hero({ data }: { data: HeroData }) {
  return <section id="home" className={styles.hero} aria-label="Introduction">
    <PageHero title={data.title} description={data.subtitle} />
  </section>;
}
