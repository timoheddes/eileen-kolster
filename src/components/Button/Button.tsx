import type { ReactElement, HTMLAttributes } from 'react';
import './Button.css';
import { Link } from 'wouter';

const Button = ({
  children,
  variant = 'primary',
  icon,
  href,
  className,
  ...props
}: {
  children: React.ReactNode;
  icon?: ReactElement;
  variant?: 'primary' | 'secondary';
  href?: string;
  className?: string;
} & HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Link href={href || ''} asChild>
      <button
        className={`button ${variant} ${icon ? 'icon' : ''} ${
          className || ''
        }`}
        {...props}
      >
        {children}
        {icon}
      </button>
    </Link>
  );
};

export default Button;
