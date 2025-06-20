import { gsap } from 'gsap';

export type TypographyEffect =
  | 'construct'
  | 'type'
  | 'waveBottom'
  | 'waveTop'
  | 'fadeIn'
  | 'waveCurve'
  | 'appear'
  | 'appearIn';

export type TypographyOptions = {
  delay?: number;
};

export const construct = (
  chars: NodeListOf<Element>,
  options: TypographyOptions,
  reverse: boolean = false
) => {
  const from = {
    'will-change': 'opacity, transform',
    opacity: 0,
    xPercent: () => gsap.utils.random(-200, 200),
    yPercent: () => gsap.utils.random(-150, 150),
  };

  const to = {
    delay: options.delay,
    ease: 'power1.inOut',
    opacity: 1,
    xPercent: 0,
    yPercent: 0,
    stagger: { each: 0.05, grid: 'auto', from: 'random' },
  };

  // @ts-expect-error - ..
  gsap.fromTo(chars, !reverse ? from : to, !reverse ? to : from);
};

export const type = (
  chars: NodeListOf<Element>,
  options: TypographyOptions,
  reverse: boolean = false
) => {
  const from = {
    'will-change': 'opacity, transform',
    opacity: 0,
    scale: 0.6,
    rotationZ: () => gsap.utils.random(-20, 20),
  };

  const to = {
    delay: options.delay,
    ease: 'power4',
    opacity: 1,
    scale: 1,
    rotation: 0,
    stagger: 0.4,
  };

  gsap.fromTo(chars, !reverse ? from : to, !reverse ? to : from);
};

export const waveBottom = (
  chars: NodeListOf<Element>,
  options: TypographyOptions,
  reverse: boolean = false
) => {
  const from = {
    'will-change': 'opacity, transform',
    opacity: 0,
    yPercent: 120,
    scaleY: 2.3,
    scaleX: 0.7,
    transformOrigin: '50% 0%',
  };

  const to = {
    delay: options.delay,
    duration: 1,
    ease: 'back.inOut(2)',
    opacity: 1,
    yPercent: 0,
    scaleY: 1,
    scaleX: 1,
    stagger: 0.03,
  };

  gsap.fromTo(chars, !reverse ? from : to, !reverse ? to : from);
};

export const waveTop = (
  chars: NodeListOf<Element>,
  options: TypographyOptions,
  reverse: boolean = false
) => {
  const from = {
    'will-change': 'transform',
    transformOrigin: '50% 0%',
    scaleY: 0,
  };

  const to = {
    delay: options.delay,
    ease: 'back',
    opacity: 1,
    scaleY: 1,
    yPercent: 0,
    stagger: 0.03,
  };

  gsap.fromTo(chars, !reverse ? from : to, !reverse ? to : from);
};

export const fadeIn = (
  chars: NodeListOf<Element>,
  options: TypographyOptions,
  reverse: boolean = false
) => {
  const from = {
    'will-change': 'opacity',
    opacity: 0,
    filter: 'blur(20px)',
  };
  const to = {
    delay: options.delay,
    duration: 0.25,
    ease: 'power1.inOut',
    opacity: 1,
    filter: 'blur(0px)',
    stagger: { each: 0.05, from: 'random' },
  };

  // @ts-expect-error - ..
  gsap.fromTo(chars, !reverse ? from : to, !reverse ? to : from);
};

export const waveCurve = (
  chars: NodeListOf<Element>,
  title: HTMLElement,
  options: TypographyOptions,
  reverse: boolean = false
) => {
  const from1 = {
    'will-change': 'transform',
    xPercent: 100,
  };
  const to1 = {
    delay: options.delay,
    ease: 'none',
    xPercent: 0,
  };

  const from2 = {
    'will-change': 'transform',
    scale: 3,
    yPercent: -900,
  };
  const to2 = {
    ease: 'back(2)',
    scale: 1,
    yPercent: 0,
    stagger: 0.05,
  };
  gsap
    .timeline()
    .fromTo(title, !reverse ? from1 : to1, !reverse ? to1 : from1)
    .fromTo(chars, !reverse ? from2 : to2, !reverse ? to2 : from2, 0);
};

export const appear = (
  chars: NodeListOf<Element>,
  options: TypographyOptions,
  reverse: boolean = false
) => {
  chars.forEach((char) =>
    gsap.set(char.parentNode, { perspective: 1000 })
  );

  const from = {
    'will-change': 'opacity, transform',
    opacity: 0,
    rotateX: () => gsap.utils.random(-120, 120),
    z: () => gsap.utils.random(-200, 200),
  };

  const to = {
    delay: options.delay,
    ease: 'none',
    opacity: 1,
    rotateX: 0,
    z: 0,
    stagger: 0.02,
  };

  gsap.fromTo(chars, !reverse ? from : to, !reverse ? to : from);
};

export const appearIn = (
  chars: NodeListOf<Element>,
  options: TypographyOptions,
  reverse: boolean = false
) => {
  chars.forEach((char) =>
    gsap.set(char.parentNode, { perspective: 1000 })
  );

  const from = {
    'will-change': 'opacity, transform',
    opacity: 0.2,
    z: -800,
  };

  const to = {
    delay: options.delay,
    ease: 'back.out(1.2)',
    opacity: 1,
    z: 0,
    stagger: 0.04,
  };

  gsap.fromTo(chars, !reverse ? from : to, !reverse ? to : from);
};
