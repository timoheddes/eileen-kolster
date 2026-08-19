import { useState, useEffect } from 'react';

export default function useIsVisible(ref: React.RefObject<HTMLElement>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Create an IntersectionObserver to observe the ref's visibility
    const observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting),
    );

    // Start observing the element
    observer.observe(element);

    // Cleanup the observer when the component unmounts or ref changes
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}
