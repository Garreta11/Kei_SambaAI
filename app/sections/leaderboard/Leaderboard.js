'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './leaderboard.module.scss';
import Image from 'next/image';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Leaderboard = ({ headlines, subtext, carousel }) => {
  const headlinesRef = useRef(null);
  const galleryRef = useRef();
  const galleryWrapperRef = useRef(null);
  const gallerySubwrapperRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeCategory, setActiveCategory] = useState(carousel.categories[0]);
  const [showGallerySubwrapper, setShowGallerySubwrapper] = useState(false);

  useEffect(() => {
    // Toggle gallerySubwrapper visibility
    ScrollTrigger.create({
      trigger: headlinesRef.current,
      start: 'top top', // Adjust if needed
      end: 'bottom-=100 top',
      onEnter: () => setShowGallerySubwrapper(false),
      onLeaveBack: () => setShowGallerySubwrapper(false),
      onLeave: () => setShowGallerySubwrapper(true),
    });

    // Horizontal carousel
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
          setActiveCategory(itemRefs.current[currentIndex].dataset.category);
        },
      },
    });
  }, []);

  const scrollToCategory = (category) => {
    const targetItem = itemRefs.current.find(
      (item) => item.dataset.category === category
    );
    if (targetItem) {
      const targetX = -targetItem.offsetLeft; // Calculate the scroll position
      gsap.to(galleryWrapperRef.current, {
        x: targetX,
        duration: 1,
        ease: 'power3.out',
      });
    }
  };

  return (
    <div className={`section ${styles.leaderboard}`}>
      <div className={styles.leaderboard__headlines} ref={headlinesRef}>
        {headlines.map((headline, index) => {
          return <p key={index}>{headline}</p>;
        })}
      </div>
      <div className={styles.leaderboard__wrapper} ref={galleryRef}>
        <div className={styles.leaderboard__wrapper__header}>
          <p className={styles.leaderboard__subtext}>{subtext}</p>
          <p
            className={`${styles.leaderboard__title} ${
              showGallerySubwrapper ? styles.leaderboard__title__show : ''
            }`}
          >
            {carousel.title}
          </p>
        </div>

        <div
          className={`${styles.leaderboard__subwrapper} ${
            showGallerySubwrapper ? styles.leaderboard__subwrapper__show : ''
          }`}
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
