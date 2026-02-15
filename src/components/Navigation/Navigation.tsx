import { Link } from 'wouter';
import './Navigation.css';
import { motion } from 'motion/react';
import { Hamburger } from './Menu/Hamburger';
import useMenuState from '../../store/menuState';

// Static dynamic imports for preloading
const preloadBiography = () => import('../../pages/Biography');
const preloadWork = () => import('../../pages/Work');
const preloadContact = () => import('../../pages/Contact');

const navigationVariants = {
  // The state before the animation begins
  hidden: {
    opacity: 0,
  },
  // The state to animate to
  visible: {
    opacity: 1,
    transition: {
      // when: "beforeChildren", // Ensures the container is visible before children animate
      staggerChildren: 0.2, // The magic property: 0.2s delay between each child
    },
  },
};

const linkVariants = {
  // The child starts 20px down and invisible
  hidden: {
    opacity: 0,
  },
  // The child animates to its original position and becomes visible
  visible: {
    opacity: 1,
  },
};

export const Navigation = () => {
  const { isMenuOpen, setIsMenuOpen } = useMenuState();

  return (
    <>
      <motion.nav
        className={`navigation ${isMenuOpen ? 'open' : ''}`}
        variants={navigationVariants}
        initial="hidden"
        animate="visible"
      >
        <Link
          href="/biography"
          className={(active) => (active ? 'active' : '')}
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.span
            variants={linkVariants}
            onMouseEnter={preloadBiography}
          >
            My Journey
          </motion.span>
        </Link>
        <Link
          href="/work"
          className={(active) => (active ? 'active' : '')}
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.span
            variants={linkVariants}
            onMouseEnter={preloadWork}
          >
            My Work
          </motion.span>
        </Link>
        <Link
          href="/contact"
          className={(active) => (active ? 'active' : '')}
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.span
            variants={linkVariants}
            onMouseEnter={preloadContact}
          >
            Get in touch
          </motion.span>
        </Link>
      </motion.nav>
      <Hamburger variant={1} />
    </>
  );
};
