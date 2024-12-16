import TitleReveal from '@/app/components/titleReveal/TitleReveal';
import styles from './semasio.module.scss';
import TextReveal from '@/app/components/textReveal/TextReveal';

const Semasio = ({ headline, subtext }) => {
  return (
    <div className={`section ${styles.semasio}`}>
      <div className={styles.semasio__wrapper}>
        {/* <p className={styles.semasio__headline}>{headline}</p> */}
        {/* <p className={styles.semasio__subtext}>{subtext}</p> */}
        <TitleReveal text={headline} className={styles.semasio__headline} />
        <TextReveal text={subtext} className={styles.semasio__subtext} />
      </div>
    </div>
  );
};

export default Semasio;
