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

    const ammountToScroll = 2 * window.innerHeight;
    const startPixelate = 0.2;
    const endPixelate = 0.8;

    // ScrollTrigger setup
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top', // Start when the container is at the top of the viewport
      end: '+=' + ammountToScroll,
      scrub: true, // Smooth scrubbing
      pin: true,
      onUpdate: (self) => {
        let progress = self.progress; // Value between 0 and 1

        // Apply a threshold to delay the effect
        if (progress < startPixelate) {
          progress = 0; // No effect before the delay threshold
        } else if (progress < endPixelate) {
          // Normalize progress after the delay
          progress = (progress - startPixelate) / (1 - startPixelate);
        }

        // Handle scale effect when progress is greater than 0.8
        if (progress >= endPixelate) {
          const mappedProgress = (1 - progress) / 0.2; // Maps 0.8 to 1 -> 1 to 0
          const scaleValue = mappedProgress; // Scale decreases linearly
          containerRef.current.style.transform = `scale(${scaleValue})`;
          containerRef.current.style.opacity = `${scaleValue}`;
          containerRef.current.style.filter = `blur(${
            (1 - scaleValue) * 100
          }px)`;
        } else {
          containerRef.current.style.filter = `blur(0px)`;
          containerRef.current.style.transform = 'scale(1)';
        }

        // Modify sphere based on adjusted progress
        if (outputRef.current.world.plane) {
          const minPixel = 2; // Minimum value of uPixel
          const maxPixel = 500; // Maximum value of uPixel
          const interpolatedValue = minPixel + progress * (maxPixel - minPixel);
          outputRef.current.world.plane.material.uniforms.uPixel.value =
            interpolatedValue;
        }
      },
    });
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
