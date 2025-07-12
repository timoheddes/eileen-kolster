import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import './Cursor.css';

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorSmallRef = useRef<HTMLDivElement>(null);
  const cursorLargeRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const currentHoveredElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorSmall = cursorSmallRef.current;
    const cursorLarge = cursorLargeRef.current;

    if (!cursor || !cursorSmall || !cursorLarge) {
      return;
    }

    const handleMouseEvents = (event: MouseEvent) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        ease: 'power3.out',
        duration: 0.3,
        overwrite: 'auto',
      });

      const target = event.target as HTMLElement;
      const interactableElement = target.closest(
        'button, a'
      ) as HTMLElement | null;

      if (event.type === 'mouseover') {
        if (
          interactableElement &&
          interactableElement !== currentHoveredElement.current
        ) {
          currentHoveredElement.current = interactableElement;
          setHovering(true);

          gsap.to(cursorSmall, {
            scale: 1.5,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(cursorLarge, {
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      }

      if (event.type === 'mouseout') {
        if (
          currentHoveredElement.current &&
          !currentHoveredElement.current.contains(
            event.relatedTarget as Node
          )
        ) {
          currentHoveredElement.current = null;
          setHovering(false);

          gsap.to(cursorSmall, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.to(cursorLarge, {
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseEvents);
    window.addEventListener('mouseover', handleMouseEvents);
    window.addEventListener('mouseout', handleMouseEvents);

    return () => {
      window.removeEventListener('mousemove', handleMouseEvents);
      window.removeEventListener('mouseover', handleMouseEvents);
      window.removeEventListener('mouseout', handleMouseEvents);
    };
  }, []);

  return (
    <div
      className={`cursor ${hovering ? 'cursor--hovering' : ''}`}
      ref={cursorRef}
    >
      <div className="cursor--small" ref={cursorSmallRef}></div>
      <div className="cursor--large" ref={cursorLargeRef}></div>
    </div>
  );
};
