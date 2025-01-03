'use client';
import { useRef, useEffect, useState } from 'react';
import styles from './videoCanvas.module.scss';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const VideoCanvas = ({ videoSrc, text, subtext }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const blurContainerRef = useRef(null);
  const textRef = useRef(null);

  const [visibleCells, setVisibleCells] = useState(4); // Initial number of visible cells

  useEffect(() => {
    videoRef.current.pause();
    const ammountToScroll = 3 * window.innerHeight;

    // Create the timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=' + ammountToScroll,
        scrub: true,
        pin: true,
        snap: {
          snapTo: [0.5, 1],
          delay: 0,
          ease: 'none',
        },
        onLeave: () => {
          navigateToNextSection();
          videoRef.current.pause();
        },
        onEnterBack: () => {
          videoRef.current.play();
        },
      },
    });

    // Dynamically adjust the number of cells based on scroll progress using the timeline's `to()` method
    timeline.to(
      {},
      {
        onUpdate: () => {
          let progress = timeline.progress();

          if (progress < 0.3) {
            const mappedProgress = mapValue(progress, 0, 0.3, 0, 0.5);

            const newCellCount = mapValue(mappedProgress, 0, 0.5, 4, 300);
            const gridSize = Math.sqrt(newCellCount);
            const rows = Math.floor(gridSize);
            const columns = Math.ceil(newCellCount / (2 * rows));

            setVisibleCells(rows * columns);

            // Update the grid styles
            blurContainerRef.current.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

            // Apply opacity to blur items based on mapped progress
            const blurItems = blurContainerRef.current.children;
            Array.from(blurItems).forEach((item) => {
              const opacity = 1 - mappedProgress; // Calculate opacity based on mapped progress
              gsap.to(item, {
                backdropFilter: `blur(${opacity * 100}px)`,
                ease: 'none',
              });
            });

            // video current time
            const targetTime = mappedProgress * videoRef.current.duration;
            videoRef.current.currentTime = targetTime;

            // reset scale
            gsap.to(containerRef.current, {
              filter: `blur(0px)`,
              scale: 1,
              ease: 'none',
            });

            // reset text
            gsap.to(textRef.current, {
              y: 0,
              filter: `blur(0px)`,
              opacity: 1,
              ease: 'none',
            });
            // reset boxes pixels
            gsap.to(blurContainerRef.current, {
              opacity: 1,
              ease: 'none',
            });
          } else if (progress < 0.7) {
            if (videoRef.current.paused) {
              videoRef.current.play();
            }

            // hide text
            gsap.to(textRef.current, {
              y: -progress * 1000,
              filter: `blur(${mapValue(progress, 0.3, 0.7, 0, 100)}px)`,
              opacity: mapValue(progress, 0.3, 0.7, 1, 0),
              ease: 'none',
            });

            // hide boxes pixels
            gsap.to(blurContainerRef.current, {
              opacity: 0,
              ease: 'none',
            });

            // reset scale
            gsap.to(containerRef.current, {
              filter: `blur(0px)`,
              scale: 1,
              ease: 'none',
            });
          } else {
            gsap.to(containerRef.current, {
              filter: `blur(${mapValue(progress, 0.7, 1, 0, 100)}px)`,
              scale: mapValue(progress, 0.7, 1, 1, 0),
              ease: 'none',
            });
          }
        },
      }
    );

    // Cleanup on unmount
    return () => {
      ScrollTrigger.kill();
    };
  }, []);

  const mapValue = (value, inMin, inMax, outMin, outMax) => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  const navigateToNextSection = () => {
    const currentSection = containerRef.current;
    const allSections = document.querySelectorAll('.section');
    let nextSection = null;

    for (let i = 0; i < allSections.length; i++) {
      if (allSections[i] === currentSection && allSections[i + 1]) {
        nextSection = allSections[i + 1];
        break;
      }
    }

    const scrollToSection = () => {
      if (nextSection) {
        const yPosition =
          nextSection.getBoundingClientRect().top + window.scrollY;
        const startTop = window.scrollY;
        const distance = yPosition - startTop;
        const duration = 2000;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
          const elapsedTime = currentTime - startTime;

          const progress = Math.min(elapsedTime / duration, 1); // Clamp progress to 1

          const easeInOutQuad = (t) =>
            t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

          const easedProgress = easeInOutQuad(progress);

          window.scrollTo(0, startTop + distance * easedProgress);

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          }
        };

        requestAnimationFrame(animateScroll);
      }
    };

    scrollToSection();
  };

  return (
    <div
      className={`section ${styles.videoCanvas}`}
      ref={containerRef}
      id='video'
    >
      <video
        ref={videoRef}
        controls={false}
        autoPlay={true}
        muted
        loop
        style={{ display: 'block' }}
      >
        <source src={videoSrc} type='video/mp4' />
      </video>

      <div className={styles.videoCanvas__blur} ref={blurContainerRef}>
        {Array.from({ length: visibleCells }).map((_, index) => (
          <div key={index} className={styles.videoCanvas__blur__item} />
        ))}
      </div>

      <div className={styles.videoCanvas__content} ref={textRef}>
        <p className={styles.videoCanvas__content__text}>{text}</p>
      </div>
    </div>
  );
};

export default VideoCanvas;
