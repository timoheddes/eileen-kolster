import { Link, useLocation } from 'wouter';
import './Navigation.css';
import { motion } from 'motion/react';
import { Hamburger } from './Menu/Hamburger';
import useMenuState from '../../store/menuState';
import { useState, useRef, useEffect, useCallback } from 'react';

// Static dynamic imports for preloading
const preloadBiography = () => import('../../pages/Biography');
const preloadWork = () => import('../../pages/Work');
const preloadContact = () => import('../../pages/Contact');

const NAV_ITEMS = [
  { href: '/work', label: 'My Work', preload: preloadWork },
  { href: '/biography', label: 'My Journey', preload: preloadBiography },
  { href: '/contact', label: 'Get in touch', preload: preloadContact },
];

const navigationVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

export const Navigation = () => {
  const { isMenuOpen, setIsMenuOpen } = useMenuState();
  const [location] = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sliderStyle, setSliderStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const activeIndex = NAV_ITEMS.findIndex((item) =>
    location.startsWith(item.href),
  );
  const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  const updateSliderBounds = useCallback(() => {
    if (targetIndex >= 0 && navRef.current) {
      const el = itemRefs.current[targetIndex];
      if (el) {
        const navRect = navRef.current.getBoundingClientRect();
        const elRect = el.getBoundingClientRect();
        setSliderStyle({
          left: elRect.left - navRect.left,
          top: elRect.top - navRect.top + elRect.height * 0.04,
          width: elRect.width,
          height: elRect.height * 0.9,
          opacity: 1,
        });
      }
    } else {
      setSliderStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [targetIndex]);

  useEffect(() => {
    updateSliderBounds();
  }, [updateSliderBounds]);

  useEffect(() => {
    window.addEventListener('resize', updateSliderBounds);
    return () => window.removeEventListener('resize', updateSliderBounds);
  }, [updateSliderBounds]);

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`navigation ${isMenuOpen ? 'open' : ''}`}
        variants={navigationVariants}
        initial="hidden"
        animate="visible"
        onMouseLeave={() => setHoveredIndex(null)}
        onBlur={(e: React.FocusEvent) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setHoveredIndex(null);
          }
        }}
      >
        <motion.div
          className="nav-slider"
          initial={false}
          animate={sliderStyle}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
            opacity: { duration: 0.2 },
          }}
        />
        {NAV_ITEMS.map((item, index) => (
          <motion.div
            key={item.href}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="nav-item"
            variants={itemVariants}
            onMouseEnter={() => {
              item.preload();
              setHoveredIndex(index);
            }}
            onFocus={() => {
              item.preload();
              setHoveredIndex(index);
            }}
          >
            <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          </motion.div>
        ))}
      </motion.nav>
      <Hamburger variant={1} />
    </>
  );
};
