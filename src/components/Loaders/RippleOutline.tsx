import { motion } from 'framer-motion';

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const Outline = ({ size = '5rem' }: { size?: string }) => {
  return (
    <motion.div
      style={{
        width: `${size}`,
        height: `${size}`,
        position: 'absolute',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        border: '2px solid #fff',
      }}
      variants={{
        initial: {
          scale: 0,
          opacity: 0,
        },
        animate: {
          scale: 1,
          opacity: [0, 0.8, 0],
          transition: {
            ease: ['easeIn', 'easeOut'],
            duration: 1,
            repeat: Infinity,
            repeatDelay: 0.5,
          },
        },
      }}
      initial="initial"
      animate="animate"
    />
  );
};

export const RippleOutline = ({
  size = '5rem',
}: {
  size?: string;
}) => {
  return (
    <motion.div
      style={{
        position: 'relative',
        width: `${size}`,
        height: `${size}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Render the new outline components */}
      <Outline size={size} />
      <Outline size={size} />
      <Outline size={size} />
    </motion.div>
  );
};
