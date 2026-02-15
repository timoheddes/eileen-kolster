import './Hamburger.css';
import { paths } from './paths';
import useMenuState from '../../../store/menuState';

type HamburgerProps = {
  variant?: 1;
};

export const Hamburger = ({ variant = 1 }: HamburgerProps) => {
  const { isMenuOpen, setIsMenuOpen } = useMenuState();
  return (
    <svg
      className={`menu ${isMenuOpen ? 'opened' : ''}`}
      viewBox="0 0 100 100"
      width="45"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
    >
      {paths[variant]}
    </svg>
  );
};
