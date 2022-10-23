import { useEffect, useState } from 'react';

export const useScreenWidth = () => {
  if (typeof window === 'undefined') return;

  const { innerWidth, addEventListener, removeEventListener } = window;

  const [screenWidth, setScreenWidth] = useState(innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    const arg = ['resize', handleResize] as const;

    addEventListener(...arg);

    return () => {
      removeEventListener(...arg);
    };
  }, []);

  return screenWidth;
};
