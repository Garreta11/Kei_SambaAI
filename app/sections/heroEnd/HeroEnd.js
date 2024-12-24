'use client';
import { useEffect, useRef, useContext } from 'react';
import { DataContext } from '@/app/context';
import styles from './hero.module.scss';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Experience from './Experience/Experience';

const HeroEnd = ({ title, number, text }) => {
  const heroRef = useRef(null);
  const containerRef = useRef(null);
  const outputRef = useRef(null);
  const contentRef = useRef(null);

  const { setLoading, loading } = useContext(DataContext);

  useEffect(() => {
    // Wait until the container element is available
    if (containerRef.current) {
      outputRef.current = new Experience({
        targetElement: containerRef.current,
      });
      setLoading(true);
    }

    // Check if the Experience instance is ready before proceeding with GSAP animations
    if (outputRef.current) {
      const ammountToScroll = 1 * window.innerHeight;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=' + ammountToScroll,
          scrub: true,
          pin: true,
          snap: {
            snapTo: [0, 1], // Two states: 0 (start) and 1 (end)
            delay: 0, // No delay
          },
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

      if (outputRef.current) {
        timeline
          .add('start')
          .fromTo(
            outputRef.current.camera.instance.position,
            {
              z: 1,
            },
            {
              z: 6,
            },
            'start'
          )
          .fromTo(
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

      if (contentRef.current) {
        timeline.fromTo(
          contentRef.current,
          {
            filter: 'blur(100px)',
            paddingTop: 0,
            paddingBottom: 0,
          },
          {
            filter: 'blur(0px)',
            paddingTop: 150,
            paddingBottom: 80,
          },
          'start'
        );
      }
    }

    // Cleanup ScrollTrigger when component is unmounted
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [setLoading]); // Only run the effect when Experience is ready

  return (
    <div className={`section ${styles.hero}`} ref={heroRef}>
      <div className={styles.hero__canvas} ref={containerRef}></div>
      {loading && (
        <div className={styles.hero__content} ref={contentRef}>
          <h1 className={styles.hero__content__title}>{text}</h1>
        </div>
      )}
    </div>
  );
};

export default HeroEnd;
