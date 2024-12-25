'use client';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './anchors.module.scss';

gsap.registerPlugin(ScrollTrigger);

const Anchors = () => {
  const [anchors, setAnchors] = useState([]);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.section'));
    setAnchors(sections);

    // Initialize ScrollTrigger for each section
    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(index),
        onEnterBack: () => setActiveSection(index),
        onLeave: () => {
          if (activeSection === index) setActiveSection(null);
        },
        onLeaveBack: () => {
          if (activeSection === index) setActiveSection(null);
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleAnchor = (targetSection) => {
    if (!targetSection) return;

    const scrollToSection = () => {
      let targetTop;
      if (targetSection.id === 'hero') {
        targetTop = 0;
      } else if (targetSection.id === 'hero-end') {
        targetTop = document.documentElement.scrollHeight - window.innerHeight;
      } else {
        const rect = targetSection.getBoundingClientRect();
        targetTop = window.scrollY + rect.top;
      }

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth',
      });

      // Verify position after the animation
      setTimeout(() => {
        const currentTop = window.scrollY;
        if (Math.abs(currentTop - targetTop) > 1) {
          // If the position is incorrect, try again
          scrollToSection();
        }
      }, 300); // Adjust timeout duration based on smooth scrolling duration
    };

    scrollToSection();
  };

  return (
    <div className={styles.anchors}>
      {anchors.map((section, index) => (
        <div
          key={index}
          className={`${styles.anchors__item} ${
            activeSection === index ? styles.anchors__item__active : ''
          }`}
          onClick={() => handleAnchor(section)}
        ></div>
      ))}
    </div>
  );
};

export default Anchors;
