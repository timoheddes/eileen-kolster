import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import AnimatedLinksObjs from '../utils/animatedLink';
import './FractalLink.css';

interface FractalLinkProps {
  children: React.ReactNode;
  effect?:
    | 'line'
    | 'twolines'
    | 'linethrough'
    | 'circle'
    | 'box'
    | 'diagonal';
  variant?: 1 | 2 | 3 | 4 | 6 | 7;
}

export const FractalLink: FC<FractalLinkProps> = ({
  children,
  effect = 'line',
  variant = 1,
}) => {
  const textRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const fxObj = AnimatedLinksObjs[variant];
    new fxObj(textRef.current as HTMLElement);
    // console.log(textRef.current?.getBoundingClientRect());
  }, [variant]);
  return (
    <span className={`fractal-link--${effect}`}>
      <a
        href="#"
        ref={textRef}
        className={`fractal-link fractal-link--${variant}`}
      >
        <span className="fractal-link-inner">{children}</span>
        <span
          className="fractal-link-deco"
          style={{ filter: 'none' }}
        ></span>
      </a>
    </span>
  );
};
