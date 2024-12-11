import styles from './semasio.module.scss';

const Semasio = ({ headline, subtext }) => {
  return (
    <div className={`section ${styles.semasio}`}>
      <div className={styles.semasio__wrapper}>
        <p className={styles.semasio__headline}>{headline}</p>
        <p className={styles.semasio__subtext}>{subtext}</p>
      </div>
    </div>
  );
};

export default Semasio;
