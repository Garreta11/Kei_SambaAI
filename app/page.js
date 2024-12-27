import styles from './page.module.scss';

// Sections
import Hero from './sections/hero/Hero';
import Leaderboard from './sections/leaderboard/Leaderboard';
import Semasio from './sections/semasio/Semasio';
import Video from './sections/video/Video';
import Layers from './sections/layers/Layers';
import TrackAdInsights from './sections/trackAdInsights/TrackAdInsights';

// Import data from the JSON file
import data from './data.json';
import dataLeaderboards from './data-leaderboards.json';

import PageWrapper from './components/pageWrapper/PageWrapper';
import PageContent from './components/pageContent/PageContent';
import VideoCanvas from './sections/videoCanvas/VideoCanvas';
import HeroEnds from './sections/heroEnd/HeroEnd';
import Attention from './sections/attention/Attention';

export default function Home() {
  return (
    <div className={`${styles.page}`}>
      <PageWrapper>
        <Hero
          title={data.hero.title}
          number={data.hero.number}
          text={data.hero.text}
        />
        <PageContent>
          <Leaderboard
            headlines={data.leaderboard.headlines}
            subtext={data.leaderboard.subtext}
            carousel={dataLeaderboards.carousel}
          />

          <VideoCanvas
            videoSrc={data.video.url}
            text={data.video.text}
            subtext={data.video.subtext}
          />

          <Layers
            headline={data.layers.headline}
            subtext={data.layers.subtext}
          />

          <Semasio
            headline={data.semasio.headline}
            subtext={data.semasio.subtext}
          />

          <HeroEnds text={data.end.text} />
        </PageContent>
      </PageWrapper>
    </div>
  );
}
