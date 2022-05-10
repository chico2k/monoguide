import React from 'react';

const Title: React.FC = ({ children }) => {
  return (
    <h3
      data-test="title"
      className="font-bold 
      uppercase 
      text-green-600 
      text-xl
      tracking-wider   
    "
    >
      {children}
    </h3>
  );
};

export default Title;
