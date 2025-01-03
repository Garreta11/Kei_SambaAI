'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './semasio.module.scss';
import TitleReveal from '@/app/components/titleReveal/TitleReveal';
import TextReveal from '@/app/components/textReveal/TextReveal';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';
import next from 'next';
gsap.registerPlugin(ScrollTrigger);

const Semasio = ({ headline, subtext }) => {
  const row1Ref = useRef();
  const row2Ref = useRef();
  const row3Ref = useRef();
  const gridRef = useRef();
  const semasioRef = useRef();
  const wrapperRef = useRef();
  const boxesRef = useRef();

  const itemsRef = useRef();
  const slidersRef = useRef();
  const imageRef = useRef();
  const [imageSrc, setImageSrc] = useState('/semasio.png');

  const items = useRef([
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Car Culture',
      dotColor: 'blue',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Concept Cars',
      dotColor: 'blue',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Motorcycles',
      dotColor: 'pink',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Formula 1',
      dotColor: 'blue',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Watch collecting',
      dotColor: 'pink',
    },
    {
      ref: useRef(),
      dotRef: useRef(),
      textRef: useRef(),
      text: 'Vintage Restoration',
      dotColor: 'blue',
    },
  ]);

  const sliders = useRef([
    {
      ref: useRef(),
      text: 'Sentiment',
      triangleRef: useRef(),
      trianglePos: '50%',
      triangleEndPos: '90%',
    },
    {
      ref: useRef(),
      text: 'Behaviors',
      triangleRef: useRef(),
      trianglePos: '30%',
      triangleEndPos: '55%',
    },
    {
      ref: useRef(),
      text: 'Preferences',
      triangleRef: useRef(),
      trianglePos: '20%',
      triangleEndPos: '70%',
    },
  ]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setImageSrc('/semasio-mobile.png'); // Set to mobile version
      } else {
        setImageSrc('/semasio.png'); // Set to desktop version
      }
    };

    // Initial check
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const ammountToScroll = 3 * window.innerHeight;
    ScrollTrigger.matchMedia({
      // Large Screens
      '(min-width: 1024px)': function () {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=' + ammountToScroll,
            pin: true,
            scrub: true,
            snap: {
              snapTo: [0.428, 0.7135, 0.857, 0.999],
            },
            onLeave: () => {
              navigateToNextSection();
            },
          },
        });

        // Animate rows
        timeline.from(row1Ref.current, {
          opacity: 0,
          y: window.innerWidth / 2,
          ease: 'none',
        });
        timeline.from(row2Ref.current, {
          opacity: 0,
          y: window.innerWidth / 2,
          ease: 'none',
        });
        timeline.from(row3Ref.current, {
          opacity: 0,
          y: window.innerWidth / 2,
          ease: 'none',
        });

        // Animate Automative
        timeline.add('show-automative');
        timeline.to(
          '.grid-item-low',
          {
            opacity: 0,
            ease: 'none',
          },
          'show-automative'
        );
        timeline.to(
          '.grid-item-main',
          {
            scale: 3,
            ease: 'none',
          },
          'show-automative'
        );

        // Animate show boxes
        timeline.add('show-boxes');
        timeline.to(
          gridRef.current,
          {
            opacity: 0,
            ease: 'none',
          },
          'show-boxes'
        );
        timeline.to(
          boxesRef.current,
          {
            opacity: 1,
            ease: 'none',
          },
          'show-boxes'
        );

        // Animate triangles
        timeline.add('triangles');
        items.current.forEach((item, index) => {
          if (item.dotColor === 'pink') {
            timeline.to(
              item.ref.current,
              {
                autoAlpha: 0,
                x: -window.innerWidth,
                padding: 0,
                margin: 0,
                overflow: 'hidden',
                height: 0,
                borderWidth: 0,
                ease: 'none',
              },
              'triangles'
            );
          }
        });
        sliders.current.forEach((item, index) => {
          timeline.to(
            item.triangleRef.current,
            {
              left: item.triangleEndPos,
              ease: 'none',
            },
            'triangles'
          );
        });

        // Animate image
        timeline.add('show-image');
        timeline.to(
          imageRef.current,
          {
            maxWidth: window.innerWidth,
            ease: 'none',
          },
          'show-image'
        );
        timeline.to(
          boxesRef.current,
          {
            gap: 0,
            ease: 'none',
          },
          'show-image'
        );
        timeline.to(
          slidersRef.current,
          {
            width: 0,
            padding: 0,
            opacity: 0,
            borderWidth: 0,
            ease: 'none',
          },
          'show-image'
        );
        timeline.to(
          itemsRef.current,
          {
            width: 'auto',
            ease: 'none',
          },
          'show-image'
        );
      },
      '(max-width: 1023px)': function () {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: 'top top',
            end: '+=' + ammountToScroll,
            pin: true,
            scrub: true,
            onLeave: () => {
              navigateToNextSection();
            },
          },
        });
        // Animate rows
        timeline.from(row1Ref.current, {
          opacity: 0,
          y: window.innerWidth / 2,
        });
        timeline.from(row2Ref.current, {
          opacity: 0,
          y: window.innerWidth / 2,
        });
        timeline.from(row3Ref.current, {
          opacity: 0,
          y: window.innerWidth / 2,
        });

        // Animate Automative
        timeline.add('show-automative');
        timeline.to(
          '.grid-item-low',
          {
            opacity: 0,
          },
          'show-automative'
        );
        timeline.to(
          '.grid-item-main',
          {
            scale: 3,
          },
          'show-automative'
        );

        // Animate show boxes
        timeline.add('show-boxes');
        timeline.to(
          gridRef.current,
          {
            opacity: 0,
          },
          'show-boxes'
        );
        timeline.to(
          boxesRef.current,
          {
            opacity: 1,
          },
          'show-boxes'
        );

        // Animate triangles
        timeline.add('triangles');
        items.current.forEach((item, index) => {
          if (item.dotColor === 'pink') {
            timeline.to(
              item.ref.current,
              {
                autoAlpha: 0,
                x: -window.innerWidth,
                padding: 0,
                margin: 0,
                overflow: 'hidden',
                height: 0,
                borderWidth: 0,
              },
              'triangles'
            );
          }
        });
        sliders.current.forEach((item, index) => {
          timeline.to(
            item.triangleRef.current,
            {
              left: item.triangleEndPos,
            },
            'triangles'
          );
        });

        // Animate image
        timeline.add('show-image');
        timeline.to(
          imageRef.current,
          {
            maxHeight: window.innerWidth,
          },
          'show-image'
        );
        timeline.to(
          boxesRef.current,
          {
            gap: 0,
          },
          'show-image'
        );
        timeline.to(
          slidersRef.current,
          {
            height: 0,
            padding: 0,
            opacity: 0,
            borderWidth: 0,
          },
          'show-image'
        );
      },
    });

    return () => {
      ScrollTrigger.killAll(); // Clean up
    };
  }, []);

  const navigateToNextSection = () => {
    const targetTop =
      document.documentElement.scrollHeight - window.innerHeight;
    const duration = 3000; // Scroll duration in milliseconds

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
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
  };

  return (
    <div className={`section ${styles.semasio}`} ref={semasioRef} id='semasio'>
      <TitleReveal text={headline} className={styles.semasio__headline} />
      <div className={styles.semasio__wrapper} ref={wrapperRef}>
        <TextReveal text={subtext} className={styles.semasio__subtext} />

        <div className={styles.semasio__wrapper__content}>
          <div className={styles.semasio__wrapper__content__grid} ref={gridRef}>
            <div
              ref={row1Ref}
              className={styles.semasio__wrapper__content__grid__row}
            >
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/energy.png'
                  width={88}
                  height={82}
                  alt='energy'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  Energy
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/cpg.png'
                  width={88}
                  height={106}
                  alt='cpg'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  cpg
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/software.png'
                  width={50.6}
                  height={87.39}
                  alt='software'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  software
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/retail.png'
                  width={77.78}
                  height={87.39}
                  alt='retail'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  retail
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/finance.png'
                  width={87.39}
                  height={59.78}
                  alt='finance'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  finance
                </p>
              </div>
            </div>
            <div
              ref={row2Ref}
              className={styles.semasio__wrapper__content__grid__row}
            >
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/healthcare.png'
                  width={58.28}
                  height={87.39}
                  alt='healthcare'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  healthcare
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/manufacturing.png'
                  width={87.39}
                  height={77.11}
                  alt='manufacturing'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  manufacturing
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-main`}
              >
                <Image
                  src='/semasio/automative.png'
                  width={87.39}
                  height={78.19}
                  alt='Automotive'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  Automotive
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/telecom.png'
                  width={87.39}
                  height={87.39}
                  alt='telecom'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  telecom
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/services.png'
                  width={87.39}
                  height={69.92}
                  alt='services'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  services
                </p>
              </div>
            </div>
            <div
              ref={row3Ref}
              className={styles.semasio__wrapper__content__grid__row}
            >
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/realstate.png'
                  width={87.39}
                  height={86.42}
                  alt='realstate'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  real state
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/media.png'
                  width={87.39}
                  height={66.59}
                  alt='media'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  media
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/travel.png'
                  width={87.39}
                  height={99.5}
                  alt='travel'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  travel
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/agriculture.png'
                  width={86.77}
                  height={87.39}
                  alt='agriculture'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  agriculture
                </p>
              </div>
              <div
                className={`${styles.semasio__wrapper__content__grid__row__item} grid-item-low`}
              >
                <Image
                  src='/semasio/education.png'
                  width={87.39}
                  height={87.39}
                  alt='education'
                />
                <p
                  className={
                    styles.semasio__wrapper__content__grid__row__item__text
                  }
                >
                  education
                </p>
              </div>
            </div>
          </div>

          <div
            className={styles.semasio__wrapper__content__boxes}
            ref={boxesRef}
          >
            <div
              ref={itemsRef}
              className={styles.semasio__wrapper__content__boxes__items}
            >
              {items.current.map((item, index) => (
                <div
                  key={index}
                  ref={item.ref}
                  className={
                    styles.semasio__wrapper__content__boxes__items__item
                  }
                >
                  <div
                    ref={item.dotRef}
                    className={`${
                      styles.semasio__wrapper__content__boxes__items__item__dot
                    } ${
                      item.dotColor === 'blue'
                        ? styles.semasio__wrapper__content__boxes__items__item__dot__blue
                        : styles.semasio__wrapper__content__boxes__items__item__dot__pink
                    }`}
                  />
                  <p ref={item.textRef}>{item.text}</p>
                </div>
              ))}
            </div>

            <div
              ref={slidersRef}
              className={styles.semasio__wrapper__content__boxes__sliders}
            >
              {sliders.current.map((slider, index) => (
                <div
                  key={index}
                  ref={slider.ref}
                  className={
                    styles.semasio__wrapper__content__boxes__sliders__item
                  }
                >
                  <p
                    className={
                      styles.semasio__wrapper__content__boxes__sliders__item__title
                    }
                  >
                    {slider.text}
                  </p>
                  <div
                    className={
                      styles.semasio__wrapper__content__boxes__sliders__item__wrapper
                    }
                  >
                    <div
                      className={
                        styles.semasio__wrapper__content__boxes__sliders__item__slider
                      }
                    />
                    <div
                      ref={slider.triangleRef}
                      className={
                        styles.semasio__wrapper__content__boxes__sliders__item__triangle
                      }
                      style={{ left: slider.trianglePos }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              ref={imageRef}
              className={styles.semasio__wrapper__content__boxes__image}
            >
              <Image src={imageSrc} width={748} height={464} alt='semasio' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Semasio;
