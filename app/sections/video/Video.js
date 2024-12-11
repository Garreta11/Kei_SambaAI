'use client';
import { useEffect, useRef } from 'react';
import styles from './video.module.scss';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Experience from './Experience/Experience';

const Video = ({ url, text }) => {
  const containerRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    outputRef.current = new Experience({
      targetElement: containerRef.current,
      videoUrl: url,
    });

    const ammountToScroll = 4 * window.innerHeight;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=' + ammountToScroll,
        scrub: true,
        pin: true,
      },
    });

    timeline.to(outputRef.current.world.plane.material.uniforms.uPixel, {
      value: 500,
    });

    timeline.to(containerRef.current, {
      scale: 0,
      filter: 'blur(100px)',
      opacity: 0,
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div className={`section ${styles.video}`}>
      <div className={styles.video__canvas} ref={containerRef}></div>
      <div className={styles.video__content}>
        <p className={styles.video__content__text}>{text}</p>
      </div>
    </div>
  );
};

export default Video;
