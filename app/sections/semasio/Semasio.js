import styles from './semasio.module.scss';

const Semasio = () => {
  return (
    <div className={`section ${styles.semasio}`}>
      <div className={styles.semasio__wrapper}>
        <p className={styles.semasio__headline}>
          3 Billion+ Web Pages. The Entire Internet&apos;s worth of video One
          Unified Intelligence Platform.
        </p>
        <p className={styles.semasio__subtext}>
          With Samba&apos;s acquisition of Semasio, we now have one of the most
          extensive maps of user attention in the world
        </p>
      </div>
    </div>
  );
};

export default Semasio;
