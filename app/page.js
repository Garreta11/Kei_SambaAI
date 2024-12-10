import styles from './page.module.scss';

import PageWrapper from './components/pageWrapper/PageWrapper';

// Sections
import Hero from './sections/hero/Hero';
import Leaderboard from './sections/leaderboard/Leaderboard';

// Import data from the JSON file
import data from './data.json';
import Semasio from './sections/semasio/Semasio';

export default function Home() {
  return (
    <div className={styles.page}>
      <PageWrapper>
        <Hero
          title={data.hero.title}
          number={data.hero.number}
          text={data.hero.text}
        />
        <Leaderboard
          headlines={data.leaderboard.headlines}
          subtext={data.leaderboard.subtext}
          carousel={data.leaderboard.carousel}
        />
        <Semasio />
      </PageWrapper>
    </div>
  );
}
