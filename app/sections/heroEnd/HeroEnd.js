'use client';
import { useEffect, useRef } from 'react';
import styles from './hero.module.scss';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Experience from './Experience/Experience';

const HeroEnd = ({ text,subtext1,subtext2,subtext3,subtext4,subtext5 }) => {
  const heroRef = useRef(null);
  const videoRef = useRef();
  const containerRef = useRef(null);
  const outputRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Wait until the container element is available
    if (containerRef.current) {
      outputRef.current = new Experience({
        targetElement: containerRef.current,
        videoElement: videoRef.current,
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
          onLeaveBack: () => {
            outputRef.current.renderer.isPaused = true;
          },
        },
      });

      timeline.fromTo(
        heroRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
        }
      );

      timeline.add('start');
      timeline.fromTo(
        outputRef.current.camera.instance.position,
        {
          z: 0,
        },
        {
          z: 6,
        },
        'start'
      );
      timeline.fromTo(
        outputRef.current.world.sphere.material.uniforms.uFresnelOffset,
        {
          value: 5,
        },
        {
          value: 0.971,
        },
        'start'
      );
    }

    // Cleanup ScrollTrigger when component is unmounted
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []); // Only run the effect when Experience is ready

  return (
    <div className={`section ${styles.hero}`} ref={heroRef} id='hero-end'>
      <div className={styles.hero__canvas} ref={containerRef}></div>
      <div className={styles.hero__content} ref={contentRef}>
        <h1 className={styles.hero__content__title}>{text}</h1>
        <div className={styles.hero__content__subtext}>{subtext1}</div>
        <div className={styles.hero__content__subtext}>{subtext2}</div>
        <div className={styles.hero__content__subtext}>{subtext3}</div>
        <div className={styles.hero__content__subtext2}>{subtext4}</div>
        <div className={styles.hero__content__subtext}>{subtext5}</div>
      </div>

      <video
        ref={videoRef}
        loop={true}
        muted
        crossOrigin='anonymous'
        playsInline
        style={{ display: 'none' }}
        onCanPlay={() => videoRef.current.play()}
      >
        <source src='wall.mp4' type='video/mp4;' />
      </video>
    </div>
  );
};

export default HeroEnd;
