import { Link, useRoute } from 'wouter';
import './Navigation.css';
import { AnimatedLink } from '../AnimatedLink/AnimatedLink';
import { motion } from 'motion/react';
import { Hamburger } from './Menu/Hamburger';
import useMenuState from '../../store/menuState';

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

const linkAnimation = 'line';
const linkVariant = 2;
const linkSize = 2;

export const Navigation = () => {
  const [biographyActive] = useRoute('/biography');
  const [contactActive] = useRoute('/contact');

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
          <motion.span variants={linkVariants}>
            <AnimatedLink
              effect={linkAnimation}
              variant={linkVariant}
              size={linkSize}
              active={biographyActive}
            >
              My Journey
            </AnimatedLink>
          </motion.span>
        </Link>
        <Link
          href="/contact"
          className={(active) => (active ? 'active' : '')}
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.span variants={linkVariants}>
            <AnimatedLink
              effect={linkAnimation}
              variant={linkVariant}
              size={linkSize}
              active={contactActive}
            >
              Get in touch
            </AnimatedLink>
          </motion.span>
        </Link>
      </motion.nav>
      <Hamburger variant={4} />
    </>
  );
};
