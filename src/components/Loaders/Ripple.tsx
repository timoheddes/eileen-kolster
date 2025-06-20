import { motion } from 'framer-motion';
import './Ripple.css';

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
    <motion.div
      className="ripple-circle"
      variants={{
        initial: {
          scale: 0,
          opacity: 0,
        },
        animate: {
          scale: 1,
          opacity: [0, 0.6, 0],
          transition: {
            ease: ['easeIn', 'easeOut'],
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        },
      }}
    />
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
