'use client';
import styles from './layers.module.scss';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TitleReveal from '@/app/components/titleReveal/TitleReveal';
import TextReveal from '@/app/components/textReveal/TextReveal';
gsap.registerPlugin(ScrollTrigger);

const Layers = ({ headline, subtext }) => {
  const layersRef = useRef();
  const contentRef = useRef();
  const layers = useRef([
    {
      ref: useRef(),
      lineRef: useRef(),
      textRef: useRef(),
      src: '/layer1.png',
      translateXFactor: 40,
      translateZ: 0,
      title: 'THE ATTENTION GRAPH',
      text: 'We measure attention across all screens, TV, mobile, desktop and web.',
    },
    {
      ref: useRef(),
      lineRef: useRef(),
      textRef: useRef(),
      src: '/layer2.png',
      translateXFactor: 180,
      translateZ: -100,
      title: 'AI video decoding',
      text: 'Our best in class AI video decoding understands the content of what you are watching with incredible accuracy.',
    },
    {
      ref: useRef(),
      lineRef: useRef(),
      textRef: useRef(),
      src: '/layer3.png',
      translateXFactor: 320,
      translateZ: -200,
      title: 'Interest profile',
      text: 'We can build and store a profile of user interest an intent that helps gauge real advertising success and follow through.',
    },
    {
      ref: useRef(),
      lineRef: useRef(),
      textRef: useRef(),
      src: '/layer4.png',
      translateXFactor: 470,
      translateZ: -300,
      title: 'Screen targeting',
      text: 'Samba AI helps target ads to the right screen at the right time. Both interstitials and in-content placements.',
    },
    {
      ref: useRef(),
      lineRef: useRef(),
      textRef: useRef(),
      src: '/layer2.png',
      translateXFactor: 600,
      translateZ: -400,
      title: 'measurement flywheel',
      text: 'Samba AI helps target ads to the right screen at the right time. Both interstitials and in-content placements.',
    },
  ]);

  useEffect(() => {
    gsap.from(contentRef.current, {
      scrollTrigger: {
        trigger: layersRef.current,
        start: 'top 20%',
        end: 'top 10%',
        scrub: true,
      },
      x: 100,
      opacity: 0.0,
      filter: 'blur(100px)',
    });

    // timeline
    const ammountToScroll = 8 * window.innerHeight;
    const timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: layersRef.current,
          start: 'top top',
          end: '+=' + ammountToScroll,
          scrub: true,
          pin: true,
          snap: {
            snapTo: [0, 0.115, 0.23, 0.394, 0.586, 0.748, 0.93], // Two states: 0 (start) and 1 (end)
            delay: 0, // No delay
          },
        },
      })
      .add('layer');

    // Initial transformation: Apply perspective and rotation during scroll
    layers.current.forEach((layer, index) => {
      timeline.to(
        layer.ref.current,
        {
          rotateY: -40,
          x: layer.translateXFactor,
          left: -500,
          z: layer.translateZ,
          duration: 1,
        },
        0 // Apply simultaneously
      );
    });

    // Individual animation: Reset each layer to `rotateY(0)`
    layers.current.forEach((layer, index) => {
      timeline.add(`section${index}`);
      timeline.to(
        layer.ref.current,
        {
          rotateY: 0,
          duration: 1,
        },
        `section${index}`
      );
      timeline.from(
        layer.textRef.current,
        {
          opacity: 0,
          filter: 'blur(100px)',
        },
        `section${index}`
      );
      timeline.from(
        layer.lineRef.current,
        {
          opacity: 0,
          filter: 'blur(100px)',
        },
        `section${index}`
      );
      // next item
      timeline.add(`section${index}_1`);
      timeline.to(
        layer.ref.current,
        {
          left: -window.innerWidth / 2,
          opacity: 0,
          filter: 'blur(100px)',
        },
        `section${index}_1`
      );
      timeline.to(
        layer.lineRef.current,
        {
          opacity: 0,
        },
        `section${index}_1`
      );
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div className={`section ${styles.layers}`}>
      <div className={styles.layers__headline}>
        <TitleReveal text={headline} />
      </div>

      <div className={styles.layers__wrapper} ref={layersRef}>
        <TextReveal className={styles.layers__subtext} text={subtext} />

        <div className={styles.layers__content} ref={contentRef}>
          <div className={styles.layers__cards}>
            {layers.current.map((layer, index) => (
              <Image
                key={index}
                className={`${styles.layers__cards__item} ${
                  styles[`layers__cards__item__${index}`]
                }`}
                ref={layer.ref}
                src={layer.src}
                width={1004}
                height={669}
                alt={`layer-${index}`}
              />
            ))}
          </div>

          <div className={styles.layers__texts}>
            {layers.current.map((layer, index) => (
              <div key={index} className={styles.layers__texts__item}>
                <Image
                  className={`${styles.layers__texts__item__line} ${
                    styles[`layers__texts__item__line__${index}`]
                  }`}
                  ref={layer.lineRef}
                  src={`line-${index + 1}.svg`}
                  width='534'
                  height='32'
                  alt='line'
                />
                <div
                  className={styles.layers__texts__item__content}
                  ref={layer.textRef}
                >
                  <h3 className={styles.layers__texts__item__content__title}>
                    {layer.title}
                  </h3>
                  <p className={styles.layers__texts__item__content__text}>
                    {layer.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layers;
