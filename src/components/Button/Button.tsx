import type { ReactElement } from 'react';
import './Button.css';
import { Link } from 'wouter';

const Button = ({
  children,
  variant = 'primary',
  icon,
  href,
}: {
  children: React.ReactNode;
  icon?: ReactElement;
  variant?: 'primary' | 'secondary';
  href?: string;
}) => {
  return (
    <Link href={href || ''}>
      <button className={`button ${variant} ${icon ? 'icon' : ''}`}>
        {children}
        {icon}
      </button>
    </Link>
  );
};

export default Button;
