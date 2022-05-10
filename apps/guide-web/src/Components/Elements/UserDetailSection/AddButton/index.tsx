import React from 'react';
import { MdAdd } from 'react-icons/md';

export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

const UserDetailAddButton: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <button
      aria-label="Add new Sport"
      type="submit"
      data-test="button"
      {...props}
      className="  
      uppercase 
      p-1
      flex 
      items-center 
      text-green-600
      text-3xl
      transition-all
      duration-200

      hover:focus:outline-none
      hover:text-green-800
         
     "
    >
      <MdAdd />
    </button>
  );
};

export default UserDetailAddButton;
