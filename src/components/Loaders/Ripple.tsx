import { motion } from 'framer-motion';
import './Ripple.css';

// Define the animation properties for a single circle
const circleVariants = {
  // The circle starts invisible and with a scale of 0
  initial: {
    scale: 0,
    opacity: 0,
  },
  // The circle animates to a larger scale and fades in and out
  animate: {
    scale: 1,
    opacity: [0, 0.6, 0], // Fades in to 60% opacity, then fades out
    // The transition defines the animation's behavior
    transition: {
      ease: 'easeInOut',
      duration: 1.5, // The animation for one circle lasts 1.5 seconds
      repeat: Infinity, // The animation will loop forever
      repeatDelay: 0.5, // Wait 0.5s before repeating
    },
  },
};

// Define the animation properties for the container
const containerVariants = {
  // The container itself doesn't animate, but it orchestrates the children
  animate: {
    transition: {
      // This is the magic property that creates the ripple effect.
      // It will start the animation for each child with a 0.3-second delay.
      staggerChildren: 0.3,
    },
  },
};

export const RippleCircle = () => {
  return (
    <motion.div className="ripple-circle" variants={circleVariants} />
  );
};

export const Ripple = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="ripple-container"
    >
      {/* Render multiple circles. The stagger will apply to each one. */}
      <RippleCircle />
      <RippleCircle />
      <RippleCircle />
    </motion.div>
  );
};
