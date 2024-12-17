'use client';
import { useRef, useEffect, useState } from 'react';
import styles from './videoCanvas.module.scss';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const VideoCanvas = ({ videoSrc }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const blurContainerRef = useRef(null);

  const [visibleCells, setVisibleCells] = useState(2); // Initial number of visible cells

  useEffect(() => {
    const ammountToScroll = 8 * window.innerHeight;

    // Set up the ScrollTrigger
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=' + ammountToScroll,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          // Dynamically adjust the number of cells based on scroll progress
          const maxCells = 100; // Maximum number of cells
          const minCells = 2; // Minimum number of cells
          let newCellCount = Math.floor(
            minCells + self.progress * (maxCells - minCells)
          );

          // Ensure the newCellCount is even
          if (newCellCount % 2 !== 0) {
            newCellCount += 1; // Make it even
          }

          setVisibleCells(newCellCount);

          // Update grid-template-columns and rows
          if (blurContainerRef.current) {
            const columns = Math.ceil(Math.sqrt(newCellCount));
            const rows = Math.ceil(newCellCount / columns);

            blurContainerRef.current.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
            blurContainerRef.current.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
          }
        },
      },
    });

    // Cleanup on unmount
    return () => {
      ScrollTrigger.kill();
    };
  }, []);

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
    </div>
  );
};

export default VideoCanvas;
