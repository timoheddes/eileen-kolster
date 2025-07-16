import { motion } from 'framer-motion';
import './Ripple.css';

const PageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        gap: '1rem',
      }}
    >
      <div className="ripple">
        <div></div>
        <div></div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{
          fontSize: '1.1rem',
          color: '#666',
          margin: 0,
        }}
      >
        Loading...
      </motion.p>
    </motion.div>
  );
};

export default PageLoader;
