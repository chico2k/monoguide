import React from 'react';
import { Label } from './style';

interface IProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const index: React.FC<IProps> = ({ children }) => {
  return <Label data-test="label">{children}</Label>;
};

export default index;
