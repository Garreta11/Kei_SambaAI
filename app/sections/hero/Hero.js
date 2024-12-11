'use client';
import { useEffect, useRef } from 'react';
import styles from './hero.module.scss';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Experience from './Experience/Experience';

const Hero = ({ title, number, text }) => {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const outputRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    outputRef.current = new Experience({ targetElement: containerRef.current });

    const ammountToScroll = 2 * window.innerHeight;

    // ScrollTrigger setup
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top', // Start when the container is at the top of the viewport
      end: '+=' + ammountToScroll,
      scrub: true, // Smooth scrubbing
      pin: true,
      onUpdate: (self) => {
        const progress = self.progress; // Scroll position as a value between 0 and 1

        // modify sphere based on progress
        if (outputRef.current.world.sphere) {
          outputRef.current.world.sphere.material.uniforms.uDistortionFrequency.value =
            2 - progress * 2;
          outputRef.current.world.sphere.material.uniforms.uScale.value =
            1 + progress * 5;
          outputRef.current.world.sphere.material.uniforms.uFresnelOffset.value =
            progress * 10 - 5;
        }

        // blur text based on progress
        if (contentRef.current) {
          const blurValue = progress * 10;
          contentRef.current.style.filter = `blur(${blurValue}px)`;
        }

        // opacity container based in progress
        if (heroRef.current) {
          const opacity =
            progress <= 0.9 ? 1 : Math.max(0, 1 - (progress - 0.9) / 0.1);
          heroRef.current.style.opacity = opacity;
        }
      },
    });
  }, []);

  return (
    <div className={`section ${styles.hero}`} ref={heroRef}>
      <div className={styles.hero__canvas} ref={containerRef}></div>
      <div className={styles.hero__content} ref={contentRef}>
        <h1 className={styles.hero__content__title}>{title}</h1>
        <div className={styles.hero__content__data}>
          <p className={styles.hero__content__data__number}>{number}</p>
          <p className={styles.hero__content__data__text}>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
