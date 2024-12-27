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

  const [visibleCells, setVisibleCells] = useState(2); // Initial number of visible cells

  useEffect(() => {
    videoRef.current.pause();
    const ammountToScroll = 8 * window.innerHeight;

    // Create the timeline
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=' + ammountToScroll,
        scrub: true,
        pin: true,
        snap: {
          snapTo: [0, 0.5, 1],
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

          // Only update when progress is smaller than 0.5
          if (progress < 0.5) {
            // hide text
            gsap.to(textRef.current, {
              y: -progress * 2000,
              filter: `blur(${mapValue(progress, 0, 0.5, 0, 100)}px)`,
              opacity: mapValue(progress, 0, 0.5, 1, 0),
            });

            // Map progress from [0, 0.5] to [0, 1]
            const mappedProgress = progress * 2;

            const maxCells = 200; // Maximum number of cells
            const minCells = 2; // Minimum number of cells
            let newCellCount = Math.floor(
              minCells + mappedProgress * (maxCells - minCells)
            );

            // Calculate rows and columns for a square grid
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
              gsap.to(item, { backdropFilter: `blur(${opacity * 100}px)` });
            });

            gsap.to(containerRef.current, {
              filter: `blur(0px)`,
              scale: 1,
            });

            // video current time
            const targetTime = progress * videoRef.current.duration;
            videoRef.current.currentTime = targetTime;
          } else {
            // Apply opacity to blur items based on mapped progress
            const blurItems = blurContainerRef.current.children;
            Array.from(blurItems).forEach((item) => {
              gsap.to(item, { backdropFilter: `blur(${0}px)` });
            });

            gsap.to(containerRef.current, {
              filter: `blur(${mapValue(progress, 0.5, 1, 0, 100)}px)`,
              scale: mapValue(progress, 0.5, 1, 1, 0),
            });

            if (videoRef.current.paused) {
              videoRef.current.play();
            }
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

    if (nextSection) {
      const yPosition =
        nextSection.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: yPosition - window.innerHeight / 4,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`section ${styles.videoCanvas}`} ref={containerRef}>
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
