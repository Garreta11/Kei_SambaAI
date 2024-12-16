import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  // Set up the initial state based on the media query
  const [isWideScreen, setIsWideScreen] = useState(false);

  useEffect(() => {
    // Define the media query
    const mediaQuery = window.matchMedia('(min-width: 1200px)');

    // Define the listener function to update the state
    const handleMediaQueryChange = (e) => {
      setIsWideScreen(e.matches);
    };

    // Add the event listener
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Set the initial state based on the current window size
    setIsWideScreen(mediaQuery.matches);

    // Clean up the event listener on component unmount
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return isWideScreen;
};

export default useWindowWidth;
