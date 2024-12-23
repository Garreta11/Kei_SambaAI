'use client';
import { useEffect, useRef } from 'react';
import styles from './attention.module.scss';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Attention = () => {
  const sectionRef = useRef();
  const contentRef = useRef();
  const lightRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const ammountToScroll = 8 * window.innerHeight;
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=' + ammountToScroll,
        scrub: true,
        pin: true,
      },
    });

    timeline.to(lightRef.current, {
      opacity: 0.3,
    });

    timeline.to(contentRef.current, {
      opacity: 1,
      gap: 100,
    });

    timeline.to(contentRef.current, {
      opacity: 1,
      gap: 100,
    });

    timeline.add('letters');
    // Target both word elements
    timeline.to(
      `.${styles.attention__content__word}`,
      {
        gap: '100px',
      },
      'letters' // Sync this animation with the previous one
    );
    timeline.to(
      `.${styles.attention__content__word__text}`,
      {
        maxWidth: 400,
      },
      'letters' // Sync this animation with the previous one
    );

    timeline.to(contentRef.current, {
      opacity: 0,
    });

    timeline.to(textRef.current, {
      opacity: 1,
    });

    timeline.to(lightRef.current, {
      opacity: 0,
    });
  }, []);

  return (
    <div className={`section ${styles.attention}`} ref={sectionRef}>
      <div className={styles.attention__light} ref={lightRef}></div>
      <div className={styles.attention__content} ref={contentRef}>
        <div className={styles.attention__content__word}>
          <h3 className={`letter ${styles.attention__content__word__letter}`}>
            A
          </h3>
          <h3 className={`word ${styles.attention__content__word__text}`}>
            Attention
          </h3>
        </div>
        <div className={styles.attention__content__word}>
          <h3 className={`letter ${styles.attention__content__word__letter}`}>
            I
          </h3>
          <h3 className={`word ${styles.attention__content__word__text}`}>
            Intention
          </h3>
        </div>
      </div>
      <div className={styles.attention__finaltext} ref={textRef}>
        <h3 className={styles.attention__finaltext__text}>
          The world's first graph of attention and intention actionable in
          real-time
        </h3>
      </div>
    </div>
  );
};

export default Attention;
