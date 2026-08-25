import type { HeroData } from '@/lib/contentful/models';
import styles from './Home.module.css';

export default function Hero({ data }: { data: HeroData }) {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <h1 id="hero-title">{data.title}</h1>
      <p>{data.subtitle}</p>
    </section>
  );
}
