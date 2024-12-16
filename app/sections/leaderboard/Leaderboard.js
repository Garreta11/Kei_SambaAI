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
        const ammountToScroll = galleryWidth - window.innerWidth;
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
          },
        });
      },
    });

    gsap.from(gallerySubwrapperRef.current, {
      scrollTrigger: {
        trigger: galleryRef.current,
        start: 'top 20%',
        end: 'end end',
        scrub: true,
      },
      opacity: 0,
      filter: 'blur(100px)',
    });
    gsap.from(titleRef.current, {
      scrollTrigger: {
        trigger: galleryRef.current,
        start: 'top 20%',
        end: 'end end',
        scrub: true,
      },
      opacity: 0,
      filter: 'blur(100px)',
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const scrollToCategory = (category) => {
    if (galleryRef.current) {
      galleryRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={`section ${styles.leaderboard}`}>
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
                          <p>{item.platform}</p>
                        </div>
                        <Image
                          className={
                            styles.leaderboard__gallery__wrapper__item__image
                          }
                          src={item.imgUrl}
                          width={423}
                          height={180}
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

export default Leaderboard;
