'use client';
import React, { useEffect, useRef, useState } from 'react';
import styles from './glitch.module.scss';

function createNumberIncrementer(initialNumber, maxNumber) {
  let currentNumber = initialNumber;
  
  function increment() {
    const randomIncrement = Math.floor(Math.random() * 100) + 1;
    currentNumber += randomIncrement;
    
    if (currentNumber > maxNumber) {
      currentNumber = initialNumber;
    }
    
    // Format the number with thousands separators
    const formattedNumber = currentNumber.toLocaleString('en-US');
    return formattedNumber;
  }
  
  function startIncrementing(callback) {
    return setInterval(() => {
      const newNumber = increment();
      callback(newNumber);
    }, 1000);
  }
  
  return {
    increment,
    startIncrementing
  };
}

const Glitch = ({ children, className, initialNumber = 0, maxNumber = 1000 }) => {
  const [number, setNumber] = useState(initialNumber.toLocaleString('en-US'));
  const textRef = useRef();

  useEffect(() => {
    const incrementer = createNumberIncrementer(initialNumber, maxNumber);
    const interval = incrementer.startIncrementing((newNumber) => {
      setNumber(newNumber);
    });

    return () => clearInterval(interval);
  }, [initialNumber, maxNumber]);

  return (
    <p ref={textRef} className={`${className} ${styles.glitch}`}>
      {number}
    </p>
  );
};

export default Glitch;