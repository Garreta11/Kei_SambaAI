import TitleReveal from '@/app/components/titleReveal/TitleReveal';
import styles from './trackAdInsights.module.scss';
import TextReveal from '@/app/components/textReveal/TextReveal';

const TrackAdInsights = ({ headline, subtext }) => {
  return (
    <div className={`section ${styles.track}`}>
      <div className={styles.track__wrapper}>
        {/* <p className={styles.track__headline}>{headline}</p> */}
        {/* <p className={styles.track__subtext}>{subtext}</p> */}
        <TitleReveal className={styles.track__headline} text={headline} />
        <TextReveal className={styles.track__subtext} text={subtext} />
      </div>
    </div>
  );
};

export default TrackAdInsights;
