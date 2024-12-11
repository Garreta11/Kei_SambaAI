import styles from './trackAdInsights.module.scss';

const TrackAdInsights = ({ headline, subtext }) => {
  return (
    <div className={`section ${styles.track}`}>
      <div className={styles.track__wrapper}>
        <p className={styles.track__headline}>{headline}</p>
        <p className={styles.track__subtext}>{subtext}</p>
      </div>
    </div>
  );
};

export default TrackAdInsights;
