'use client';

import { useEffect, useRef, useContext } from 'react';
import { DataContext } from '@/app/context';
import styles from './hero.module.scss';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Experience from './Experience/Experience';
import Glitch from '@/app/components/glitch/Glitch';

gsap.registerPlugin(ScrollTrigger);

const Hero = ({ title, number, text }) => {
  const heroRef = useRef(null);
  const videoRef = useRef();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const outputRef = useRef(null);

  const { setLoading, loading } = useContext(DataContext);

  const initializeExperience = () => {
    if (!containerRef.current) return;

    outputRef.current = new Experience({
      targetElement: containerRef.current,
      videoElement: videoRef.current,
    });

    setLoading(true);
  };

  const setupScrollAnimations = () => {
    if (!outputRef.current) return;

    const ammountToScroll = window.innerHeight;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: `+=${ammountToScroll}`,
        scrub: true,
        pin: true,
        snap: {
          snapTo: [0, 1],
          delay: 0,
          ease: 'none',
        },
        onEnter: () => (outputRef.current.renderer.isPaused = false),
        onLeave: () => {
          outputRef.current.renderer.isPaused = true;
          navigateToNextSection();
        },
        onEnterBack: () => {
          outputRef.current.renderer.isPaused = false;
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        },
        onLeaveBack: () => (outputRef.current.renderer.isPaused = true),
      },
    });

    timeline
      .add('start')
      .to(
        outputRef.current.camera.instance.position,
        { z: 0, ease: 'none' },
        'start'
      )
      .to(
        outputRef.current.world.sphere.material.uniforms.uFresnelOffset,
        { value: 5 },
        'start'
      )
      .to(
        contentRef.current,
        { filter: 'blur(10px)', paddingTop: 0, paddingBottom: 0 },
        'start'
      );
    timeline.to(heroRef.current, { opacity: 0 });
  };

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

    const scrollToSection = () => {
      let targetTop;
      if (nextSection) {
        const yPosition =
          nextSection.getBoundingClientRect().top + window.scrollY;
        targetTop = yPosition - window.innerHeight / 2;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }
    };

    setTimeout(() => {
      scrollToSection();
    }, 100);
  };

  useEffect(() => {
    initializeExperience();
    setupScrollAnimations();

    return () => {
      outputRef.current?.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [setLoading]);

  return (
    <div className={`section ${styles.hero}`} ref={heroRef} id='hero'>
      <div className={styles.hero__canvas} ref={containerRef}></div>

      <div className={styles.hero__content} ref={contentRef}>
        <h1 className={styles.hero__content__title}>{title}</h1>
        <div className={styles.hero__content__data}>
          <Glitch className={styles.hero__content__data__number}>
            {number}
          </Glitch>
          <p className={styles.hero__content__data__text}>{text}</p>
        </div>
      </div>

      <video
        ref={videoRef}
        loop
        muted
        crossOrigin='anonymous'
        playsInline
        style={{ display: 'none' }}
        onCanPlay={() => videoRef.current.play()}
      >
        <source src='wall.mp4' type='video/mp4' />
      </video>
    </div>
  );
};

export default Hero;
