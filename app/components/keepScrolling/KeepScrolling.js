'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './keepScrolling.module.scss';

const DETECT_SECONDS = 3;

const KeepScrolling = () => {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(DETECT_SECONDS);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const checkIfAtBottom = () => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    // Check if user is in the last section
    setIsAtBottom(scrollY + viewportHeight >= documentHeight - 10); // Add margin for precision
  };

  useEffect(() => {
    const handleScroll = () => {
      setCount(DETECT_SECONDS);
      checkIfAtBottom();
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    checkIfAtBottom(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (count > 0) {
      setShow(false);
      const timer = setTimeout(() => {
        setCount((current) => current - 1);
      }, 1000);
      return () => clearTimeout(timer); // Clean up the timer
    } else if (!isAtBottom) {
      setShow(true);
    }
  }, [count, isAtBottom]);

  return (
    <div className={`${styles.scroll} ${show ? styles.scroll__show : ''}`}>
      <p className={styles.scroll__text}>Scroll down</p>
      <svg
        width='20'
        height='20'
        viewBox='0 0 62 36'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M4.24327 0.9375C3.30227 0.9375 2.34727 1.3035 1.63327 2.0175C0.204273 3.4465 0.204273 5.8095 1.63327 7.2385L28.3743 33.9795C29.0643 34.6695 30.0383 35.0595 30.9843 35.0595C31.9213 35.0595 32.8553 34.7185 33.5943 33.9795L60.2983 7.2735C61.7943 5.8655 61.8133 3.4465 60.3843 2.0175C58.9553 0.5885 56.5923 0.5885 55.1633 2.0175L55.1623 2.0185L31.0313 26.1965L6.85227 2.0175C6.13727 1.3025 5.18327 0.9375 4.24327 0.9375Z'
          fill='white'
        />
      </svg>
    </div>
  );
};

export default KeepScrolling;
