import { AnimatedTypography } from '../AnimatedTypography';
import './Logo.css';

export const Logo = ({
  text,
  size,
}: {
  text: string;
  size: number;
}) => {
  return (
    <h1 className="logo" style={{ fontSize: `${size}em` }}>
      <AnimatedTypography text={text} size={1} effect="appear" />
    </h1>
  );
};
