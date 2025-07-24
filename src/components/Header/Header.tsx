import { Link, useRoute } from 'wouter';
import { Logo } from '../Logo';
import './Header.css';
import { Navigation } from '../Navigation';
import {
  motion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { useState } from 'react';
import useMenuState from '../../store/menuState';
import useAudioState from '../../store/audioState';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const triggerScrollAt = 50;
  const { isMenuOpen } = useMenuState();
  const [shareActive] = useRoute('/share/:track');
  const { isPlaying } = useAudioState();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    // If the user scrolls down more than 50px, set isScrolled to true, otherwise false
    if (latest > triggerScrollAt) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const headerVariants = {
    transparent: {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backdropFilter: 'blur(0px) brightness(100%)',
      borderBottom: '1px solid transparent',
      className: 'transparent',
    },
    solid: {
      backgroundColor: 'rgba(54, 54, 54, 0.41)',
      backdropFilter: 'blur(6px) brightness(145%)',
      borderBottom: '1px solid rgba(75, 75, 75, 0.16)',
      className: 'scroll',
    },
  };
  return (
    <motion.header
      className="header"
      variants={headerVariants}
      animate={isScrolled && !isMenuOpen ? 'solid' : 'transparent'}
      initial="transparent"
    >
      <div
        className="content"
        style={{
          justifyContent: shareActive ? 'center' : 'space-between',
        }}
      >
        <Link
          href="/"
          style={{
            zIndex: 100,
            display: shareActive ? 'flex' : 'block',
            flexDirection: shareActive ? 'column' : 'row',
            alignItems: shareActive ? 'center' : 'flex-start',
            pointerEvents: shareActive ? 'none' : 'auto',
          }}
        >
          <Logo text="Eileen Kolster" size={3} />
          {shareActive && !isPlaying && <div>Play to listen</div>}
        </Link>
        {!shareActive && <Navigation />}
      </div>
    </motion.header>
  );
};
