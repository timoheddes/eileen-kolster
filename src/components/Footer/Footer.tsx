import { AnimatedLink } from '../AnimatedLink';
import './Footer.css';

import { ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <span className="opacity-70">
        © {new Date().getFullYear()} Eileen Kolster |{' '}
      </span>
      <a
        href="https://www.instagram.com/eileenkolster/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginLeft: '0.3em' }}
      >
        <AnimatedLink effect="circle" variant={2} size={2}>
          Find me on Instagram <ArrowUpRight size={12} />
        </AnimatedLink>
      </a>
    </footer>
  );
};
