import { useEffect, useState } from 'react';

function getWindowDimensions() {
  // eslint-disable-next-line no-undef
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    // eslint-disable-next-line no-undef
    window.addEventListener('resize', handleResize);
    // eslint-disable-next-line no-undef
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
