import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import Animations, { type AnimatedLinkEffect } from './animations';
import './AnimatedLink.css';

interface AnimatedLinkProps {
  children: React.ReactNode;
  effect?: AnimatedLinkEffect;
  variant?: 1 | 2 | 3 | 4 | 5;
  size?: number;
  active?: boolean;
}

export const AnimatedLink: FC<AnimatedLinkProps> = ({
  children,
  effect = 'line',
  variant = 1,
  size = 5,
  active = false,
}) => {
  const textRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const fxObj = Animations[variant];
    new fxObj(textRef.current as HTMLElement, effect, size);
  }, [variant, effect, size]);

  return (
    <span className={`animated-link--${effect}`}>
      <span
        ref={textRef}
        className={`animated-link animated-link--${variant} ${
          active ? 'active' : ''
        }`}
      >
        <span className="animated-link-inner">{children}</span>
        <span
          className="animated-link-deco"
          style={{
            filter: 'none',
            width:
              effect === 'circle' || effect === 'box'
                ? `${size}rem`
                : 'auto',
            height:
              effect === 'circle' || effect === 'box'
                ? `${size}rem`
                : 'auto',
            margin:
              effect === 'circle' || effect === 'box'
                ? `-${size / 2}rem 0 0 -${size / 2}rem`
                : 'auto',
          }}
        ></span>
      </span>
    </span>
  );
};
