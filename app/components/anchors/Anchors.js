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
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
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
