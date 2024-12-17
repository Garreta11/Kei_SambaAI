'use client';
import React, { useEffect, useRef } from 'react';
import styles from './glitch.module.scss';
import SplitType from 'split-type';

const Glitch = ({ children, className }) => {
  const textRef = useRef();
  useEffect(() => {
    const GLITCH_CHARS = '0123456789'.split('');

    const text = new SplitType(textRef.current, { types: 'chars' });
    const CHARS = text.chars;
    for (let c = 0; c < CHARS.length; c++) {
      // We are going to inline 10 CSS variables
      for (let g = 0; g < 10; g++) {
        CHARS[c].style.setProperty(
          `--char-${g}`,
          `"${GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]}"`
        );
        CHARS[c].style.setProperty('--count', Math.random() * 10 + 1);
        CHARS[c].setAttribute('data-char', CHARS[c].innerHTML);
      }
    }
  }, []);

  return (
    <p ref={textRef} className={`${className} ${styles.glitch}`}>
      {children}
    </p>
  );
};

export default Glitch;
