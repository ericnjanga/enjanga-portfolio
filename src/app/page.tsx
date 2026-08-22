import styles from './page.module.css';
import getHomePageData from '@/lib/contentful/fetching/getHomePageData';

export default async function Home() {
  // const homePageData = await getHomePageData('/');



  // console.log('-----> homePageData = ', homePageData);

  return (
    <main className={styles.main}>
      <h1>Welcome to Next.js!</h1>
      <p>Get started by editing src/app/page.tsx.</p>
    </main>
  );
}
