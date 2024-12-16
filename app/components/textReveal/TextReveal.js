'use client';

import React, { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger);

const TextReveal = ({ text, className = null }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const text = new SplitType(textRef.current, { types: 'chars,words' });
    gsap.from(text.words, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 70%',
        end: 'top 50%',
        scrub: true,
      },
      x: 200,
      opacity: 0.0,
      filter: 'blur(100px)',
      stagger: 0.1,
    });
  }, []);
  return (
    <p ref={textRef} className={className}>
      {text}
    </p>
  );
};

export default TextReveal;
