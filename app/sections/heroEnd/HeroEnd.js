'use client';
import { useEffect, useRef, useContext } from 'react';
import { DataContext } from '@/app/context';
import styles from './hero.module.scss';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Experience from './Experience/Experience';

const HeroEnd = ({ text }) => {
  const heroRef = useRef(null);
  const videoRef = useRef();
  const containerRef = useRef(null);
  const outputRef = useRef(null);
  const contentRef = useRef(null);

  const { setLoading, loading } = useContext(DataContext);

  useEffect(() => {
    // Wait until the container element is available
    if (containerRef.current) {
      outputRef.current = new Experience({
        targetElement: containerRef.current,
        videoElement: videoRef.current,
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
          /* snap: {
            snapTo: [0, 1], // Two states: 0 (start) and 1 (end)
            duration: 5,
          }, */
          onEnter: () => {
            //outputRef.current.renderer.isPaused = false;
          },
          onLeaveBack: () => {
            //outputRef.current.renderer.isPaused = true;
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
        timeline.add('start');
        timeline
          .fromTo(
            outputRef.current.camera.instance.position,
            {
              z: -0.5,
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
    }

    // Cleanup ScrollTrigger when component is unmounted
    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [setLoading]); // Only run the effect when Experience is ready

  return (
    <div className={`section ${styles.hero}`} ref={heroRef} id='hero-end'>
      <div className={styles.hero__canvas} ref={containerRef}></div>
      {loading && (
        <div className={styles.hero__content} ref={contentRef}>
          <h1 className={styles.hero__content__title}>{text}</h1>
        </div>
      )}

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
