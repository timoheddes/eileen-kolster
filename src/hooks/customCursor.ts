import { useEffect, useState, useRef } from 'react';

/**
 * A React Hook to detect if the user is likely using a mouse
 * and should see a custom cursor.
 * It checks for pointer capabilities and the first input event.
 *
 * @returns {boolean} `true` if a custom cursor should be shown (mouse detected), `false` otherwise (touch device).
 */
const useCustomCursorDetection = (): boolean => {
  const [showCustomCursor, setShowCustomCursor] = useState(false);
  const inputDetected = useRef(false);

  useEffect(() => {
    const htmlElement = document.documentElement;

    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      if (!inputDetected.current) {
        if (e.matches) {
          setShowCustomCursor(true);
          htmlElement.classList.add('custom-cursor-active');
        } else {
          setShowCustomCursor(false);
          htmlElement.classList.remove('custom-cursor-active');
        }
        inputDetected.current = true;
      }
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    if (mediaQuery.matches) {
      setShowCustomCursor(true);
      htmlElement.classList.add('custom-cursor-active');
      inputDetected.current = true;
    }

    const handleFirstInput = (event: MouseEvent | TouchEvent) => {
      if (!inputDetected.current) {
        if (event.type === 'mousemove') {
          setShowCustomCursor(true);
          htmlElement.classList.add('custom-cursor-active');
        } else if (event.type === 'touchstart') {
          setShowCustomCursor(false);
          htmlElement.classList.remove('custom-cursor-active');
        }
        inputDetected.current = true;
      }
      window.removeEventListener('mousemove', handleFirstInput);
      window.removeEventListener('touchstart', handleFirstInput);
    };

    if (!inputDetected.current) {
      window.addEventListener('mousemove', handleFirstInput, {
        once: true,
      });
      window.addEventListener('touchstart', handleFirstInput, {
        once: true,
      });
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      window.removeEventListener('mousemove', handleFirstInput);
      window.removeEventListener('touchstart', handleFirstInput);
    };
  }, []);

  return showCustomCursor;
};

export default useCustomCursorDetection;
