import './Hamburger.css';
import { paths } from './paths';
import useMenuState from '../../../store/menuState';

type HamburgerProps = {
  variant?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
};

const rotates = [1, 4, 7, 8];

export const Hamburger = ({ variant = 4 }: HamburgerProps) => {
  const { isMenuOpen, setIsMenuOpen } = useMenuState();
  return (
    <svg
      className={`ham ${
        rotates.includes(variant) ? 'hamRotate' : ''
      } ham${variant} ${isMenuOpen ? 'active' : ''}`}
      viewBox="0 0 100 100"
      width="60"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {paths[variant]}
    </svg>
  );
};
