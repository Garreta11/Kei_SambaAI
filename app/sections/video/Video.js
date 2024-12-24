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
  const textRef = useRef(null);
  /* const blurRef = useRef(null); */

  useEffect(() => {
    const video = document.createElement('video');
    video.src = url; // Replace with your video file path
    video.loop = true;
    video.playsInline = true;
    video.muted = true;

    const ammountToScroll = 16 * window.innerHeight;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=' + ammountToScroll,
        scrub: true,
        pin: true,
        snap: {
          snapTo: [0, 0.25, 0.75, 1],
          duration: 1,
        },
        onEnter: () => {
          outputRef.current.renderer.isPaused = false;
        },
        onLeave: () => {
          gsap.to(outputRef.current.world.plane.material.uniforms.uPixel, {
            value: 500,
            onComplete: () => {
              outputRef.current.renderer.isPaused = true;
            },
          });
        },
        onEnterBack: () => {
          gsap.to(outputRef.current.world.plane.material.uniforms.uPixel, {
            value: 500,
            onComplete: () => {
              outputRef.current.renderer.isPaused = false;
            },
          });
        },
        onLeaveBack: () => {
          gsap.to(outputRef.current.world.plane.material.uniforms.uPixel, {
            value: 2,
            onComplete: () => {
              outputRef.current.renderer.isPaused = true;
            },
          });
        },
      },
    });

    video.addEventListener('loadeddata', () => {
      alert('video is loaded !');
      video.play();
      outputRef.current = new Experience({
        targetElement: containerRef.current,
        video: video,
      });

      timeline.from(textRef.current, {
        opacity: 0,
        filter: 'blur(100px)',
      });

      timeline.to(textRef.current, {
        y: '-50vh',
        opacity: 0,
      });

      timeline.add('pixel');
      timeline.to(
        outputRef.current.world.plane.material.uniforms.uPixel,
        {
          value: 500,
          ease: 'power4.in',
        },
        'pixel'
      );
      /* timeline.to(
        blurRef.current,
        {
          backdropFilter: 'blur(0)',
        },
        'pixel'
      ); */

      timeline.to(containerRef.current, {
        scale: 0,
        filter: 'blur(100px)',
        opacity: 0,
      });

      /* // Ensure the video is loaded before setting up ScrollTrigger
      const waitForVideoLoad = () => {
        const videoElement = outputRef.current.world.plane.video;
        return new Promise((resolve) => {
          if (videoElement.readyState >= 3) {
            resolve();
          } else {
            videoElement.addEventListener('loadeddata', resolve, {
              once: true,
            });
          }
        });
      };

      waitForVideoLoad().then(() => {
        timeline.from(textRef.current, {
          opacity: 0,
          filter: 'blur(100px)',
        });

        timeline.to(textRef.current, {
          y: '-50vh',
          opacity: 0,
        });

        timeline.add('pixel');
        timeline.to(
          outputRef.current.world.plane.material.uniforms.uPixel,
          {
            value: 500,
            ease: 'power4.in',
          },
          'pixel'
        );

        timeline.to(containerRef.current, {
          scale: 0,
          filter: 'blur(100px)',
          opacity: 0,
        });
      }); */
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div className={`section ${styles.video}`} ref={containerRef}>
      <div className={styles.video__canvas}></div>
      {/* <div className={styles.video__blur} ref={blurRef} /> */}
      <div className={styles.video__content} ref={textRef}>
        <p className={styles.video__content__text}>{text}</p>
      </div>
    </div>
  );
};

export default Video;
