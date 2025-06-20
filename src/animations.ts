import type { Variants } from 'framer-motion';

export type AnimationOptions = {
  stagger?: boolean;
  duration?: number;
  delay?: number;
  easing?: string;
};

export const anim = (variants: Variants) => {
  return {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants,
  };
};

export const staggerB = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 2,
      staggerChildren: 0.5,
      ease: 'easeInOut',
    },
  },
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

export const stagger = {
  visible: {
    transition: {
      // duration: 0.8,
      ease: 'easeInOut',
      delay: 0.1,
      staggerChildren: 0.25,
    },
  },
};

export const perspective = {
  initial: {
    scale: 1,
    y: 0,
  },
  enter: {
    scale: 1,
    y: 0,
  },
  exit: {
    scale: 0.9,
    y: -150,
    opacity: 0.5,
    transition: {
      duration: 1.2,
      ease: 'easeInOut',
    },
  },
};

export const slide = {
  initial: {
    y: '100vh',
  },
  enter: {
    y: '100vh',
  },
  exit: {
    y: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

export const opacity = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
};

export const scaleAndOpacity = (from: number, to: number) => ({
  hidden: {
    opacity: 0,
    scale: from,
  },
  visible: {
    opacity: 1,
    scale: to,
    transition: {
      duration: 0.8,
      ease: 'easeInOut',
    },
  },
  exit: {
    y: 0,
    opacity: 0,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
});
