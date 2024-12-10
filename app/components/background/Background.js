import styles from './background.module.scss';

const Background = () => {
  return (
    <div className={styles.background}>
      <svg xmls='http://www.w3.org/2000/svg'>
        <defs>
          <filter id='goo'>
            <feGaussianBlur
              in='SourceGraphic'
              stdDeviation='10'
              result='blur'
            />
            <feColorMatrix
              in='blur'
              mode='matrix'
              values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8'
              result='goo'
            />
            <feBlend in='SourceGraphic' in2='goo' />
          </filter>
        </defs>
      </svg>
      <div className={styles.background__container}>
        <div className={styles.background__g1}></div>
        <div className={styles.background__g2}></div>
        <div className={styles.background__g3}></div>
        <div className={styles.background__g4}></div>
        <div className={styles.background__g5}></div>
      </div>
    </div>
  );
};

export default Background;
