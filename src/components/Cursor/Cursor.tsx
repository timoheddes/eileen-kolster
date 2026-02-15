import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import './Cursor.css';

type CursorMode = 'default' | 'zoom' | 'close';

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorSmallRef = useRef<HTMLDivElement>(null);
  const cursorLargeRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const currentHoveredElement = useRef<HTMLElement | null>(null);
  const cursorModeRef = useRef<CursorMode>('default');

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorSmall = cursorSmallRef.current;
    const cursorLarge = cursorLargeRef.current;

    if (!cursor || !cursorSmall || !cursorLarge) {
      return;
    }

    const updateCursorMode = (target: HTMLElement) => {
      const lightboxElement = target.closest('.image-lightbox');
      const zoomElement = target.closest('.image-zoom');

      let newMode: CursorMode = 'default';
      if (lightboxElement) newMode = 'close';
      else if (zoomElement) newMode = 'zoom';

      if (newMode !== cursorModeRef.current) {
        cursorModeRef.current = newMode;
        setCursorMode(newMode);
      }
    };

    // Position-only handler — runs on every mousemove and must stay
    // as lean as possible to avoid starving other mousemove listeners
    // (e.g. MagneticWrapper).
    const handleMouseMove = (event: MouseEvent) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    // Element-change handlers — only fire when the pointer enters or
    // leaves a DOM node, so DOM traversal (closest) is fine here.
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      updateCursorMode(target);

      const interactableElement = target.closest(
        'button, a'
      ) as HTMLElement | null;

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
    };

    const handleMouseOut = (event: MouseEvent) => {
      const target = event.relatedTarget as HTMLElement | null;
      if (target) updateCursorMode(target);

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
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      className={`cursor ${hovering ? 'cursor--hovering' : ''} ${
        cursorMode !== 'default' ? 'cursor--icon-active' : ''
      }`}
      ref={cursorRef}
    >
      <div className="cursor--small" ref={cursorSmallRef}></div>
      <div className="cursor--large" ref={cursorLargeRef}></div>
      <svg
        className={`cursor--icon ${
          cursorMode === 'zoom' ? 'cursor--icon-zoom' : ''
        } ${cursorMode === 'close' ? 'cursor--icon-close' : ''}`}
        viewBox="0 0 32 32"
        width="32"
        height="32"
        fill="none"
      >
        <circle
          cx="16"
          cy="16"
          r="14"
          stroke="white"
          strokeWidth="1.5"
        />
        <line
          x1="16"
          y1="9"
          x2="16"
          y2="23"
          stroke="white"
          strokeWidth="1.5"
        />
        <line
          x1="9"
          y1="16"
          x2="23"
          y2="16"
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};
