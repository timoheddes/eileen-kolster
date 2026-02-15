import { AnimatedTypography } from '../AnimatedTypography';
import './Logo.css';
import useMenuState from '../../store/menuState';

export const Logo = ({ text, size }: { text: string; size: number }) => {
  const { setIsMenuOpen } = useMenuState();

  return (
    <h1
      className="logo"
      style={{ fontSize: `${size}em` }}
      onClick={() => setIsMenuOpen(false)}
    >
      <AnimatedTypography text={text} size={1} effect="appear" />
    </h1>
  );
};
