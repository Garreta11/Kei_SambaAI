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
  // Animation configuration variables
  const SWAY_CONFIG = {
    perspective: 2000,           // Perspective depth for 3D effect
    velocitySensitivity: 500,   // Higher number = less sensitive to scroll speed
    rotationAmount: 8,           // Higher number = more rotation
    zMovement: 30,              // Higher number = more depth movement
    duration: 0.6,              // Animation duration in seconds
    scrubAmount: 0.5,           // How smooth the scrubbing is
    returnDuration: 0.2         // How long it takes to return to flat state
  };

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
          start: 'top top',
          end: 'bottom-=100 top',
        });
        const gallery = galleryWrapperRef.current;
        const galleryWidth = gallery.offsetWidth;
        const ammountToScroll = galleryWidth - window.innerWidth + 150;
        
        // Main horizontal scroll animation
        const mainScroll = gsap.to(gallery, {
          x: -ammountToScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top top',
            end: '+=' + ammountToScroll,
            pin: true,
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const totalItems = itemRefs.current.length;
              const currentIndex = Math.round(progress * (totalItems - 1));
              setActiveCategory(
                itemRefs.current[currentIndex].dataset.category
              );

              // Get scroll velocity for all images
              const velocity = Math.abs(self.getVelocity() / SWAY_CONFIG.velocitySensitivity);
              const direction = self.direction;

              // Apply sway to all images
              itemRefs.current.forEach((itemRef) => {
                if (!itemRef) return;
                const image = itemRef.querySelector(`.${styles.leaderboard__gallery__wrapper__item__image}`);
                if (!image) return;

                gsap.to(image, {
                  rotateY: -direction * velocity * SWAY_CONFIG.rotationAmount,
                  z: velocity * SWAY_CONFIG.zMovement,
                  duration: SWAY_CONFIG.duration,
                  force3D: true,
                  ease: "power1.out"
                });
              });
            },
            onLeave: () => {
              navigateToNextSection();
            },
            onScrubComplete: () => {
              // Return all images to flat state
              itemRefs.current.forEach((itemRef) => {
                if (!itemRef) return;
                const image = itemRef.querySelector(`.${styles.leaderboard__gallery__wrapper__item__image}`);
                if (!image) return;

                gsap.to(image, {
                  rotateY: 0,
                  z: 0,
                  duration: SWAY_CONFIG.returnDuration,
                  ease: "power2.out"
                });
              });
            }
          },
        });

        // Add sway animation to each image
        itemRefs.current.forEach((itemRef) => {
          if (!itemRef) return;
          
          const image = itemRef.querySelector(`.${styles.leaderboard__gallery__wrapper__item__image}`);
          if (!image) return;

          // First set the parent container's perspective
          const itemContainer = itemRef.querySelector(`.${styles.leaderboard__gallery__wrapper__item__top}`);
          gsap.set(itemContainer, {
            perspective: 2000,
            transformStyle: "preserve-3d"
          });

          // Then animate the image
          gsap.to(image, {
            transformPerspective: 2000,
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            ease: "none",
            scrollTrigger: {
              trigger: itemRef,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
              onUpdate: (self) => {
                const velocity = Math.abs(self.getVelocity("x") / 1000); // Reduced sensitivity
                const direction = self.direction;
                
                gsap.to(image, {
                  rotateY: -direction * velocity * 8, // Reduced rotation amount
                  z: velocity * 30, // Reduced z-movement
                  duration: 0.8, // Slightly longer duration for smoother movement
                  force3D: true,
                  ease: "power1.out"
                });
              }
            }
          });
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
          <p className={`${styles.leaderboard__title}`} ref={titleRef} id="leaderTitle">
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
                    <div className={styles.leaderboard__gallery__wrapper__item__top}>
                      <p className={styles.leaderboard__gallery__wrapper__item__index}>
                        {formattedIndex}
                      </p>
                      <div className={styles.leaderboard__gallery__wrapper__item__header}>
                        <p className={styles.leaderboard__gallery__wrapper__item__header__title}>
                          {item.title}
                        </p>
                        <Logo platform={item.platform} />
                      </div>
                      <img
                        className={styles.leaderboard__gallery__wrapper__item__image}
                        src={item.imgUrl}
                        alt={`carousel-item-${index}`}
                      />
                      {/* item.category !== "Ads" && (
                        <div className={styles.leaderboard__gallery__wrapper__item__viewers}>
                          <p className={styles.leaderboard__gallery__wrapper__item__viewers__increment}>
                            {item.increment}
                          </p>
                          <p className={styles.leaderboard__gallery__wrapper__item__viewers__text}>
                            {item.viewers}
                          </p>
                        </div>
                      ) */}
                    </div>
                     {/* item.category !== "Ads" && item.data && <Graph dataset={item.data} /> */} 
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
  } else if (platform === 'Peacock') {
    return (
      <Image
        src='/logo-peacock.png' // Replace with the actual path to the HBO MAX logo
        alt='Peacock Logo'
        width={80} // Adjust width and height as needed
        height={26}
      />
    );
  } else if (platform === 'Hulu') {
    return (
      <Image
        src='/logo-hulu.png' // Replace with the actual path to the HBO MAX logo
        alt='hulu Logo'
        width={82} // Adjust width and height as needed
        height={27}
      />
    );
  }else if (platform === 'Prime Video') {
    return (
      <Image
        src='/logo-primevideo.png' // Replace with the actual path to the HBO MAX logo
        alt='Prime Video Logo'
        width={75} // Adjust width and height as needed
        height={25}
      />
    );
  } else if (platform === 'Paramount +') {
    return (
      <Image
        src='/logo-paramount.png' // Replace with the actual path to the HBO MAX logo
        alt='Paramount Logo'
        width={90} // Adjust width and height as needed
        height={21}
      />
    );
  }else {
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
