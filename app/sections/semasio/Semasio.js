'use client';
import { useEffect, useRef } from 'react';
import styles from './semasio.module.scss';
import TitleReveal from '@/app/components/titleReveal/TitleReveal';
import TextReveal from '@/app/components/textReveal/TextReveal';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Semasio = ({ headline, subtext }) => {
  const contentRef = useRef();
  const itemsRef = useRef();
  const slidersRef = useRef();

  const items = useRef([
    {
      ref: useRef(),
      dotRef: useRef(),
      text: 'Investing',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      text: 'Stock Market',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      text: 'Real State',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      text: 'Finance',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      text: 'Crypto',
    },
  ]);

  const sliders = useRef([
    {
      ref: useRef(),
      text: 'Sentiment',
      triangleRef: useRef(),
      trianglePos: '30%',
      triangleEndPos: '90%',
    },
    {
      ref: useRef(),
      text: 'Behavious',
      triangleRef: useRef(),
      trianglePos: '70%',
      triangleEndPos: '20%',
    },
    {
      ref: useRef(),
      text: 'Preferences',
      triangleRef: useRef(),
      trianglePos: '40%',
      triangleEndPos: '10%',
    },
  ]);

  useEffect(() => {
    const ammountToScroll = 4 * window.innerHeight;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top top',
        end: '+=' + ammountToScroll,
        pin: true,
        scrub: true,
        snap: 0.5,
      },
    });

    items.current.forEach((item, index) => {
      timeline.fromTo(
        item.ref.current,
        {
          autoAlpha: 0,
          y: -100,
          scale: 1 - 0.1 * index,
          x: 0,
        },
        {
          autoAlpha: 1,
          y: 0,
          x: -index * 100,
        }
      );
    });

    timeline.add('show-two');
    items.current.forEach((item, index) => {
      timeline.to(
        item.ref.current,
        {
          fontSize: '16px',
          padding: '10px',
          minWidth: '462px',
          scale: 1,
          x: 0,
        },
        'show-two'
      );
      timeline.fromTo(
        item.dotRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
        'show-two'
      );
    });
    timeline.to(
      itemsRef.current,
      {
        width: '50%',
      },
      'show-two'
    );
    timeline.to(
      slidersRef.current,
      {
        width: '50%',
        opacity: 1,
      },
      'show-two'
    );

    timeline.add('triangles');
    sliders.current.forEach((item, index) => {
      timeline.to(
        item.triangleRef.current,
        {
          left: item.triangleEndPos,
        },
        'triangles'
      );
    });
  }, []);

  return (
    <div className={`section ${styles.semasio}`}>
      <TitleReveal text={headline} className={styles.semasio__headline} />
      <div className={styles.semasio__wrapper} ref={contentRef}>
        <TextReveal text={subtext} className={styles.semasio__subtext} />

        <div className={styles.semasio__content}>
          <div ref={itemsRef} className={styles.semasio__content__items}>
            {items.current.map((item, index) => (
              <div
                key={index}
                ref={item.ref}
                className={styles.semasio__content__items__item}
              >
                <div
                  ref={item.dotRef}
                  className={styles.semasio__content__items__item__dot}
                />
                <p>{item.text}</p>
              </div>
            ))}
          </div>

          <div ref={slidersRef} className={styles.semasio__content__sliders}>
            {sliders.current.map((slider, index) => (
              <div
                key={index}
                ref={slider.ref}
                className={styles.semasio__content__sliders__item}
              >
                <p className={styles.semasio__content__sliders__item__title}>
                  {slider.text}
                </p>
                <div
                  className={styles.semasio__content__sliders__item__wrapper}
                >
                  <div
                    className={styles.semasio__content__sliders__item__slider}
                  />
                  <div
                    ref={slider.triangleRef}
                    className={styles.semasio__content__sliders__item__triangle}
                    style={{ left: slider.trianglePos }}
                  />
                </div>
              </div>
            ))}
            {/* <div className={styles.semasio__content__sliders__item}>
              <p className={styles.semasio__content__sliders__item__title}>
                Sentiment
              </p>
              <div className={styles.semasio__content__sliders__item__slider} />
            </div>
            <div className={styles.semasio__content__sliders__item}>
              <p className={styles.semasio__content__sliders__item__title}>
                Behaviour
              </p>
              <div className={styles.semasio__content__sliders__item__slider} />
            </div>
            <div className={styles.semasio__content__sliders__item}>
              <p className={styles.semasio__content__sliders__item__title}>
                Preferences
              </p>
              <div className={styles.semasio__content__sliders__item__slider} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Semasio;
