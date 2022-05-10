import React from 'react';
import { customButton } from '../../Theme';

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

interface IProps {
  href?: string;
  onClick?: () => void;
  children: any;
  size: 1 | 2 | 3 | 4 | 5;
  primary?: boolean;
  secondary?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, IProps>(
  ({ children, href, onClick, size, primary, secondary, ...props }, ref) => {
    let buttonBasisCSS: string;

    if (!primary && !secondary) buttonBasisCSS = customButton.primary;
    if (primary) buttonBasisCSS = customButton.primary;
    if (secondary) buttonBasisCSS = customButton.secondary;

    let sizeProperties: string;
    if (size === 1) sizeProperties = customButton.size.one;
    if (size === 2) sizeProperties = customButton.size.two;
    if (size === 3) sizeProperties = customButton.size.three;
    if (size === 4) sizeProperties = customButton.size.four;
    if (size === 5) sizeProperties = customButton.size.five;

    return (
      <a
        type="button"
        ref={ref}
        href={href}
        onClick={onClick}
        className={classNames(buttonBasisCSS, sizeProperties)}
        {...props}
      >
        {children}
      </a>
    );
  },
);
export default Link;
