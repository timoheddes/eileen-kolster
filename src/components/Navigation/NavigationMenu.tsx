import React, { useState } from 'react';
// 1. Import the 'Variants' type from Framer Motion
import { motion, AnimatePresence, type Variants } from 'framer-motion';

// You can customize your navigation links here
const navItems = [
  { title: 'Biography', href: '/biography' },
  { title: 'Work', href: '/work' },
  { title: 'Get in touch', href: '/contact' },
];

// 2. Apply the 'Variants' type to your constant. This tells TypeScript
//    the exact shape to expect, solving the type inference issue.
const menuVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '-100%',
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.4,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

// 3. Do the same for your other variants object.
const menuItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
    },
  },
};

// --- The Main Navigation Component ---

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <style>{`
        .nav-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 2rem;
          box-sizing: border-box;
          z-index: 1000;
          font-family: sans-serif;
        }

        .nav-desktop ul {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-desktop a {
          text-decoration: none;
          color: #333;
          font-weight: 500;
          position: relative;
          padding-bottom: 0.25rem;
        }

        .nav-desktop a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #333;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .nav-desktop a:hover::after {
            transform: scaleX(1);
            transform-origin: left;
        }

        .menu-toggle-button {
          display: none; /* Hidden on desktop */
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001; /* Ensure it's above the flyout menu */
        }

        .mobile-menu-panel {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #f0f2f5;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .mobile-menu-panel ul {
            list-style: none;
            padding: 0;
            text-align: center;
        }

        .mobile-menu-panel li {
            margin-bottom: 2rem;
        }

        .mobile-menu-panel a {
            font-size: 2rem;
            font-weight: 600;
            color: #34424b;
            text-decoration: none;
        }

        /* Responsive Breakpoint */
        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }
          .menu-toggle-button {
            display: block;
          }
        }
      `}</style>

      <nav className="nav-container">
        {/* LOGO (optional) */}
        <div>
          <a
            href="/"
            style={{
              textDecoration: 'none',
              color: '#333',
              fontWeight: 'bold',
            }}
          >
            Composer Name
          </a>
        </div>

        {/* DESKTOP NAVIGATION */}
        <div className="nav-desktop">
          <ul>
            {navItems.map((item) => (
              <li key={item.title}>
                <a href={item.href}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          className="menu-toggle-button"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            animate={isOpen ? 'open' : 'closed'}
          >
            {/* Top line of the hamburger */}
            <motion.path
              d="M 2 5 L 22 5"
              stroke="#333"
              strokeWidth="2"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 6.5 },
              }}
              transition={{ duration: 0.3 }}
            />
            {/* Middle line */}
            <motion.path
              d="M 2 11.5 L 22 11.5"
              stroke="#333"
              strokeWidth="2"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.2 }}
            />
            {/* Bottom line */}
            <motion.path
              d="M 2 18 L 22 18"
              stroke="#333"
              strokeWidth="2"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -6.5 },
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.svg>
        </button>
      </nav>

      {/* MOBILE MENU FLYOUT */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu-panel"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.ul>
              {navItems.map((item) => (
                <motion.li key={item.title} variants={menuItemVariants}>
                  <a href={item.href} onClick={() => setIsOpen(false)}>
                    {item.title}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
