import React from 'react';
import { customButton, joinClassNames } from '../../../Theme';

export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size: 1 | 2 | 3 | 4 | 5;
  primary?: boolean;
  secondary?: boolean;
}

const ButtonSubmit: React.FC<IProps> = ({ children, size, primary, secondary, ...props }) => {
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
    <button type="submit" data-test="button" className={joinClassNames(buttonBasisCSS, sizeProperties)} {...props}>
      {children}
    </button>
  );
};

export default ButtonSubmit;
