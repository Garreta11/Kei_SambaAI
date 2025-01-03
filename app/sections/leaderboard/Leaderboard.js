'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './leaderboard.module.scss';
import Image from 'next/image';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Graph from '@/app/components/graph/Graph';
import TitleReveal from '@/app/components/titleReveal/TitleReveal';
import TextReveal from '@/app/components/textReveal/TextReveal';

gsap.registerPlugin(ScrollTrigger);

const Leaderboard = ({ headlines, subtext, carousel }) => {
  const leaderboardRef = useRef(null);
  const headlinesRef = useRef(null);
  const galleryRef = useRef();
  const titleRef = useRef();
  const galleryWrapperRef = useRef(null);
  const gallerySubwrapperRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeCategory, setActiveCategory] = useState(carousel.categories[0]);

  useEffect(() => {
    // Horizontal carousel only for Desktop
    ScrollTrigger.matchMedia({
      '(min-width: 1024px)': function () {
        // Toggle gallerySubwrapper visibility
        ScrollTrigger.create({
          trigger: headlinesRef.current,
          start: 'top top', // Adjust if needed
          end: 'bottom-=100 top',
        });
        const gallery = galleryWrapperRef.current;
        const galleryWidth = gallery.offsetWidth;
        const ammountToScroll = galleryWidth - window.innerWidth + 150;
        gsap.to(gallery, {
          x: -ammountToScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top top',
            end: '+=' + ammountToScroll,
            pin: true,
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress; // 0 to 1
              const totalItems = itemRefs.current.length;
              const currentIndex = Math.round(progress * (totalItems - 1));
              setActiveCategory(
                itemRefs.current[currentIndex].dataset.category
              );
            },
            onLeave: () => {
              navigateToNextSection();
            },
          },
        });
      },
    });

    gsap.from(gallerySubwrapperRef.current, {
      scrollTrigger: {
        trigger: galleryRef.current,
        start: 'top 30%',
        end: 'end 30%',
        scrub: true,
      },
      opacity: 0,
      filter: 'blur(100px)',
      ease: 'none',
    });
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: galleryRef.current,
        start: 'top 30%',
        end: 'end 30%',
        scrub: true,
      },
      opacity: 0,
      filter: 'blur(100px)',
      ease: 'none',
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const navigateToNextSection = () => {
    const currentSection = leaderboardRef.current;
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
        const duration = 1000; // Duration in milliseconds
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

  const scrollToCategory = (category) => {
    if (galleryRef.current) {
      galleryRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className={`section ${styles.leaderboard}`}
      ref={leaderboardRef}
      id='leaderboard'
    >
      <div className={styles.leaderboard__headlines} ref={headlinesRef}>
        {headlines.map((headline, index) => {
          return <TitleReveal key={index} text={headline} />;
        })}
      </div>
      <div className={styles.leaderboard__wrapper} ref={galleryRef}>
        <div className={styles.leaderboard__wrapper__header}>
          <TextReveal text={subtext} className={styles.leaderboard__subtext} />
          <p className={`${styles.leaderboard__title}`} ref={titleRef}>
            {carousel.title}
          </p>
        </div>

        <div
          className={`${styles.leaderboard__subwrapper}`}
          ref={gallerySubwrapperRef}
        >
          <div className={styles.leaderboard__categories}>
            {carousel.categories.map((category, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.leaderboard__categories__item} ${
                    activeCategory === category
                      ? styles.leaderboard__categories__item__selected
                      : ''
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                    scrollToCategory(category);
                  }}
                >
                  <p>{category}</p>
                </div>
              );
            })}
          </div>

          <div className={styles.leaderboard__gallery}>
            <div
              className={styles.leaderboard__gallery__wrapper}
              ref={galleryWrapperRef}
            >
              {carousel.items
                .filter((item) => item.category === activeCategory)
                .map((item, index) => {
                  const formattedIndex = String(index + 1).padStart(2, '0');
                  return (
                    <div
                      key={index}
                      ref={(el) => (itemRefs.current[index] = el)}
                      className={`${styles.leaderboard__gallery__wrapper__item}`}
                      data-category={item.category}
                    >
                      <div
                        className={
                          styles.leaderboard__gallery__wrapper__item__top
                        }
                      >
                        <p
                          className={
                            styles.leaderboard__gallery__wrapper__item__index
                          }
                        >
                          {formattedIndex}
                        </p>
                        <div
                          className={
                            styles.leaderboard__gallery__wrapper__item__header
                          }
                        >
                          <p
                            className={
                              styles.leaderboard__gallery__wrapper__item__header__title
                            }
                          >
                            {item.title}
                          </p>
                          <Logo platform={item.platform} />
                        </div>
                        <img
                          className={
                            styles.leaderboard__gallery__wrapper__item__image
                          }
                          src={item.imgUrl}
                          alt={`carousel-item-${index}`}
                        />
                        <div
                          className={
                            styles.leaderboard__gallery__wrapper__item__viewers
                          }
                        >
                          <p
                            className={
                              styles.leaderboard__gallery__wrapper__item__viewers__increment
                            }
                          >
                            {item.increment}
                          </p>
                          <p
                            className={
                              styles.leaderboard__gallery__wrapper__item__viewers__text
                            }
                          >
                            {item.viewers}
                          </p>
                        </div>
                      </div>

                      {item.data && <Graph dataset={item.data} />}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Logo = ({ platform }) => {
  if (platform === 'Netflix') {
    return (
      <Image
        src='/netflix.png' // Replace with the actual path to the Netflix logo
        alt='Netflix Logo'
        width={77} // Adjust width and height as needed
        height={22}
      />
    );
  } else if (platform === 'HBO Max') {
    return (
      <Image
        src='/hbomax.png' // Replace with the actual path to the HBO MAX logo
        alt='HBO MAX Logo'
        width={81} // Adjust width and height as needed
        height={14}
      />
    );
  } else {
    return (
      <p
        className={styles.leaderboard__gallery__wrapper__item__header__platform}
      >
        {platform}
      </p>
    );
  }
};

export default Leaderboard;
