import React, { useState, useRef, useCallback, memo } from 'react';
import './MagneticWrapper.css';

const SMOOTHING = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';

interface MagneticWrapperProps {
  children: React.ReactNode;
  force?: number;
  style?: React.CSSProperties;
}

const MagneticWrapper = memo(function MagneticWrapper({
  children,
  force = 0.2,
  style,
}: MagneticWrapperProps) {
  const hoverAreaRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!hoverAreaRef.current) return;
      const { clientX, clientY } = e;
      const { width, height, left, top } =
        hoverAreaRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      setPosition({
        x: deltaX * force,
        y: deltaY * force,
      });
    },
    [force]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  const { x, y } = position;

  return (
    <div
      ref={hoverAreaRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-wrapper"
      style={style}
    >
      <div
        style={{
          transform: `translate(${x}px, ${y}px)`,
          transition: SMOOTHING,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
});

export default MagneticWrapper;
