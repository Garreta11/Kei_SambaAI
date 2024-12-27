'use client';
import { useEffect, useRef, useContext } from 'react';
import { DataContext } from '@/app/context';
import styles from './hero.module.scss';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import Experience from './Experience/Experience';
import Glitch from '@/app/components/glitch/Glitch';

const Hero = ({ title, number, text }) => {
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
      let lastScrollTop = 0;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=' + ammountToScroll,
          scrub: true,
          pin: true,
          /* onUpdate: () => {
            const scrollTop =
              window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
              // Scrolling down
              navigateToNextSection();
            } else {
              // Scrolling up
              window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); // Scroll to top of the page
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
          }, */
          onEnter: () => {
            outputRef.current.renderer.isPaused = false;
          },
          onLeave: () => {
            outputRef.current.renderer.isPaused = true;
            navigateToNextSection();
          },
          onEnterBack: () => {
            outputRef.current.renderer.isPaused = false;
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' }); // Scroll to top of the page
          },
          onLeaveBack: () => {
            outputRef.current.renderer.isPaused = true;
          },
        },
      });

      if (outputRef.current) {
        timeline.add('start');
        timeline
          .to(
            outputRef.current.camera.instance.position,
            {
              z: -0.1,
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
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [setLoading]); // Only run the effect when Experience is ready

  const navigateToNextSection = () => {
    const currentSection = heroRef.current;
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
      //nextSection.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: yPosition - window.innerHeight / 4,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`section ${styles.hero}`} ref={heroRef} id='hero'>
      <div className={styles.hero__canvas} ref={containerRef}></div>
      {loading && (
        <div className={styles.hero__content} ref={contentRef}>
          <h1 className={styles.hero__content__title}>{title}</h1>
          <div className={styles.hero__content__data}>
            {/* <p className={styles.hero__content__data__number}>{number}</p> */}
            <Glitch className={styles.hero__content__data__number}>
              {number}
            </Glitch>
            <p className={styles.hero__content__data__text}>{text}</p>
          </div>
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

export default Hero;
