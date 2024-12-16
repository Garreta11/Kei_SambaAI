import styles from './page.module.scss';

import PageWrapper from './components/pageWrapper/PageWrapper';

// Sections
import Hero from './sections/hero/Hero';
import Leaderboard from './sections/leaderboard/Leaderboard';

// Import data from the JSON file
import data from './data.json';
import dataLeaderboards from './data-leaderboards.json';
import Semasio from './sections/semasio/Semasio';
import Background from './components/background/Background';
import Video from './sections/video/Video';
import Layers from './sections/layers/Layers';
import TrackAdInsights from './sections/trackAdInsights/TrackAdInsights';
import VideoCanvas from './sections/videoCanvas/VideoCanvas';

export default function Home() {
  return (
    <div className={styles.page}>
      <PageWrapper>
        {/* <Background /> */}
        <Hero
          title={data.hero.title}
          number={data.hero.number}
          text={data.hero.text}
        />
        <Leaderboard
          headlines={data.leaderboard.headlines}
          subtext={data.leaderboard.subtext}
          carousel={dataLeaderboards.carousel}
        />
        <Semasio
          headline={data.semasio.headline}
          subtext={data.semasio.subtext}
        />
        <Video url={data.video.url} text={data.video.text} />
        {/* <VideoCanvas videoSrc={data.video.url} /> */}

        <Layers headline={data.layers.headline} subtext={data.layers.subtext} />

        <TrackAdInsights
          headline={data.track.headline}
          subtext={data.track.subtext}
        />

        <div style={{ height: '300svh' }}></div>
      </PageWrapper>
    </div>
  );
}
