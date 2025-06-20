import 'splitting/dist/splitting.css';
import 'splitting/dist/splitting-cells.css';
import Splitting from 'splitting';
import { useEffect, useRef, useState } from 'react';
import type {
  TypographyEffect,
  TypographyOptions,
} from './animations';
import {
  construct,
  type,
  waveBottom,
  waveTop,
  fadeIn,
  waveCurve,
  appear,
  appearIn,
} from './animations';

const applyEffect = (
  effect: TypographyEffect,
  options: TypographyOptions,
  chars: NodeListOf<Element>,
  title: HTMLHeadingElement,
  reverse: boolean = false
) => {
  switch (effect) {
    case 'construct':
      construct(chars, options, reverse);
      break;
    case 'type':
      type(chars, options, reverse);
      break;
    case 'waveBottom':
      waveBottom(chars, options, reverse);
      break;
    case 'waveTop':
      waveTop(chars, options, reverse);
      break;
    case 'fadeIn':
      fadeIn(chars, options, reverse);
      break;
    case 'waveCurve':
      waveCurve(chars, title, options, reverse);
      break;
    case 'appear':
      appear(chars, options, reverse);
      break;
    case 'appearIn':
      appearIn(chars, options, reverse);
  }
};

export const AnimatedTypography = ({
  text,
  size,
  className = '',
  effect,
  effectOut,
  options = {
    delay: 0,
    time: 3000,
  },
}: {
  text: string;
  size: number;
  className?: string;
  effect: TypographyEffect;
  effectOut?: TypographyEffect;
  options?: {
    delay: number;
    time: number;
  };
}) => {
  const title = useRef<HTMLHeadingElement>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;
    Splitting();
    const chars = title.current?.querySelectorAll('.char');
    if (chars && title.current) {
      title.current.style.visibility = 'visible';
      applyEffect(effect, options, chars, title.current);
      if (effectOut) {
        setTimeout(() => {
          applyEffect(
            effectOut,
            options,
            chars,
            title.current!,
            true
          );
        }, options.time);
      }
    }
    setFinished(true);
    // document.querySelectorAll('.char').forEach((char) => {
    //   char.addEventListener('mouseenter', () => {
    //     applyEffect('appear', { delay: 0 }, [char, title.current!);
    //   });
    // });
  }, [effect, options, effectOut, finished]);

  const splitText = text.split(' ');

  return (
    <div className="animated-typography">
      <span
        ref={title}
        className={`content__title ${className}`}
        style={{ fontSize: `${size}em`, visibility: 'hidden' }}
        data-splitting
        data-effect5
      >
        {splitText.map((word, index) => (
          <span key={index}>{word} </span>
        ))}
      </span>
    </div>
  );
};
