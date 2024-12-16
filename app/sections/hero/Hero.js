'use client';
import { useEffect, useRef, useState } from 'react';
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
    // Wait until the container element is available
    if (containerRef.current) {
      outputRef.current = new Experience({
        targetElement: containerRef.current,
      });
    }

    // Check if the Experience instance is ready before proceeding with GSAP animations
    if (outputRef.current) {
      const ammountToScroll = 2 * window.innerHeight;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=' + ammountToScroll,
          scrub: true,
          pin: true,
          onEnter: () => {
            outputRef.current.renderer.isPaused = false;
          },
          onLeave: () => {
            outputRef.current.renderer.isPaused = true;
          },
          onEnterBack: () => {
            outputRef.current.renderer.isPaused = false;
          },
          onLeaveBack: () => {
            outputRef.current.renderer.isPaused = true;
          },
        },
      });

      if (outputRef.current) {
        timeline
          .add('start')
          .to(
            outputRef.current.camera.instance.position,
            {
              z: 1,
            },
            'start'
          )
          .to(
            outputRef.current.world.sphere.material.uniforms.uFresnelOffset,
            {
              value: 5,
            },
            'start'
          );
      }

      if (contentRef.current) {
        timeline.to(
          contentRef.current,
          {
            filter: 'blur(10px)',
            paddingTop: 0,
            paddingBottom: 0,
          },
          'start'
        );
      }

      if (heroRef.current) {
        timeline.to(heroRef.current, {
          opacity: 0,
        });
      }
    }

    // Cleanup ScrollTrigger when component is unmounted
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []); // Only run the effect when Experience is ready

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
