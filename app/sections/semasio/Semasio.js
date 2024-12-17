'use client';
import { useEffect, useRef } from 'react';
import styles from './semasio.module.scss';
import TitleReveal from '@/app/components/titleReveal/TitleReveal';
import TextReveal from '@/app/components/textReveal/TextReveal';

import SplitType from 'split-type';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);

const Semasio = ({ headline, subtext }) => {
  const contentRef = useRef();
  const itemsRef = useRef();
  const slidersRef = useRef();
  const subContentRef = useRef();
  const imageRef = useRef();

  const items = useRef([
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Investing',
      dotColor: 'blue',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Stock Market',
      dotColor: 'blue',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Real State',
      dotColor: 'pink',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Finance',
      dotColor: 'blue',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Watch collecting',
      dotColor: 'pink',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Crypto',
      dotColor: 'blue',
    },
  ]);

  const sliders = useRef([
    {
      ref: useRef(),
      text: 'Sentiment',
      triangleRef: useRef(),
      trianglePos: '30%',
      triangleStartPos: '90%',
      triangleEndPos: '90%',
    },
    {
      ref: useRef(),
      text: 'Behavious',
      triangleRef: useRef(),
      trianglePos: '70%',
      triangleStartPos: '20%',
      triangleEndPos: '50%',
    },
    {
      ref: useRef(),
      text: 'Preferences',
      triangleRef: useRef(),
      trianglePos: '40%',
      triangleStartPos: '10%',
      triangleEndPos: '70%',
    },
  ]);

  useEffect(() => {
    const ammountToScroll = 8 * window.innerHeight;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: contentRef.current,
        start: 'top top',
        end: '+=' + ammountToScroll,
        pin: true,
        scrub: true,
        snap: {
          snapTo: [0.778, 0.858, 0.928, 0.965, 1], // Two states: 0 (start) and 1 (end)
          duration: { min: 0.2, max: 0.8 }, // Optional snapping animation duration
          delay: 0, // No delay
        },
      },
    });

    // Show boxes
    items.current.forEach((item, index) => {
      // show boxes
      timeline.fromTo(
        item.ref.current,
        {
          autoAlpha: 0,
          y: -100,
          x: 0,
        },
        {
          autoAlpha: 1,
          y: 0,
          x: index * 50,
        }
      );

      // typing text
      const text = new SplitType(item.textRef.current, { types: 'chars' });
      timeline.from(text.chars, {
        opacity: 0,
        stagger: 0.1,
      });
    });

    // Small boxes and sliders appear
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

    // move triangels sliders #1
    timeline.add('triangles');
    sliders.current.forEach((item, index) => {
      timeline.to(
        item.triangleRef.current,
        {
          left: item.triangleStartPos,
        },
        'triangles'
      );
    });

    // move triangels sliders #2 & remove pink items
    timeline.add('triangles2');
    items.current.forEach((item, index) => {
      if (item.dotColor === 'pink') {
        timeline.to(
          item.ref.current,
          {
            autoAlpha: 0,
            x: -window.innerWidth,
            padding: 0,
            margin: 0,
            overflow: 'hidden',
            height: 0,
            borderWidth: 0,
          },
          'triangles2'
        );
      }
    });
    sliders.current.forEach((item, index) => {
      timeline.to(
        item.triangleRef.current,
        {
          left: item.triangleEndPos,
        },
        'triangle2'
      );
    });

    // show image
    timeline.add('showImage');
    timeline.to(
      imageRef.current,
      {
        maxWidth: window.innerWidth,
      },
      'showImage'
    );
    timeline.to(
      slidersRef.current,
      {
        width: 0,
        padding: 0,
        opacity: 0,
        borderWidth: 0,
      },
      'showImage'
    );
    timeline.to(
      itemsRef.current,
      {
        width: 'auto',
      },
      'showImage'
    );

    timeline.to(subContentRef.current, {
      y: -window.innerHeight,
      opacity: 0,
    });
  }, []);

  return (
    <div className={`section ${styles.semasio}`}>
      <TitleReveal text={headline} className={styles.semasio__headline} />
      <div className={styles.semasio__wrapper} ref={contentRef}>
        <TextReveal text={subtext} className={styles.semasio__subtext} />

        <div className={styles.semasio__content} ref={subContentRef}>
          <div ref={itemsRef} className={styles.semasio__content__items}>
            {items.current.map((item, index) => (
              <div
                key={index}
                ref={item.ref}
                className={styles.semasio__content__items__item}
              >
                <div
                  ref={item.dotRef}
                  className={`${styles.semasio__content__items__item__dot} ${
                    item.dotColor === 'blue'
                      ? styles.semasio__content__items__item__dot__blue
                      : styles.semasio__content__items__item__dot__pink
                  }`}
                />
                <p ref={item.textRef}>{item.text}</p>
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
          </div>

          <div ref={imageRef} className={styles.semasio__content__image}>
            <Image src='/semasio.png' width={748} height={464} alt='semasio' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Semasio;
