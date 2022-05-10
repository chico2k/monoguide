import React, { DetailedHTMLProps } from 'react';

const Form: React.FC<DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>> = ({
  children,
  ...props
}) => {
  return (
    <form className="space-y-6" {...props}>
      {children}
    </form>
  );
};

export default Form;
