'use client';
import styles from './layers.module.scss';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Layers = ({ headline, subtext }) => {
  const layersRef = useRef();
  const layers = useRef([
    {
      ref: useRef(),
      textRef: useRef(),
      src: '/layer1.png',
      translateXFactor: 1,
      translateZ: 0,
      title: 'THE ATTENTION GRAPH',
      text: 'We measure attention across all screens, TV, mobile, desktop and web.',
    },
    {
      ref: useRef(),
      textRef: useRef(),
      src: '/layer2.png',
      translateXFactor: 50,
      translateZ: -50,
      title: 'AI video decoding',
      text: 'Our best in class AI video decoding understands the content of what you are watching with incredible accuracy.',
    },
    {
      ref: useRef(),
      textRef: useRef(),
      src: '/layer3.png',
      translateXFactor: 100,
      translateZ: -100,
      title: 'Interest profile',
      text: 'We can build and store a profile of user interest an intent that helps gauge real advertising success and follow through.',
    },
    {
      ref: useRef(),
      textRef: useRef(),
      src: '/layer4.png',
      translateXFactor: 150,
      translateZ: -150,
      title: 'Screen targeting',
      text: 'Samba AI helps target ads to the right screen at the right time. Both interstitials and in-content placements.',
    },
  ]);

  useEffect(() => {
    const ammountToScroll = 8 * window.innerHeight;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: layersRef.current,
        start: 'top top',
        end: '+=' + ammountToScroll,
        scrub: true,
        pin: true,
      },
    });

    // Initial transformation: Apply perspective and rotation during scroll
    layers.current
      .slice()
      .reverse()
      .forEach((layer, index) => {
        timeline.to(
          layer.ref.current,
          {
            rotateY: -30,
            x: layer.translateXFactor,
            left: -200,
            z: layer.translateZ,
            duration: 1,
          },
          0 // Apply simultaneously
        );
      });

    // Individual animation: Reset each layer to `rotateY(0)`
    layers.current.forEach((layer, index) => {
      const reverseIndex = layers.current.length - 1 - index;
      timeline.to(
        layer.ref.current,
        {
          rotateY: 0,
          duration: 1,
        },
        `+=${reverseIndex * 0.3}` // Delay each layer sequentially
      );

      timeline.to(
        layer.textRef.current,
        {
          opacity: 1,
        },
        `+=${reverseIndex * 0.3}` // Delay each layer sequentially
      );

      timeline.to(
        layer.ref.current,
        {
          left: -window.innerWidth / 2,
          opacity: 0,
          filter: 'blur(100px)',
        },
        `+=${reverseIndex * 0.6}` // Delay each layer sequentially
      );
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div className={`section ${styles.layers}`}>
      <div className={styles.layers__headline}>
        <p>{headline}</p>
      </div>

      <div className={styles.layers__wrapper} ref={layersRef}>
        <p className={styles.layers__subtext}>{subtext}</p>

        <div className={styles.layers__content}>
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
              <div
                className={styles.layers__texts__item}
                key={index}
                ref={layer.textRef}
              >
                <h3 className={styles.layers__texts__item__title}>
                  {layer.title}
                </h3>
                <p className={styles.layers__texts__item__text}>{layer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layers;
