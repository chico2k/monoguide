import React from 'react';

export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const UserDetailDeleteButton: React.FC<IProps> = ({ children, ...props }) => {
  return (
    <button
      type="submit"
      data-test="button"
      {...props}
      className="      
      uppercase 
      p-1
      flex 
      items-center 
      text-gray-200
      max-w-max

      rounded-full 
      w-8  
      h-8 
      transition-all
      duration-200

      hover:text-green-600
      hover:focus:outline-none
            
      focus:text-green-600
      focus:opacity-100
      focus:outline-none
      
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="32"
        height="32"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </button>
  );
};

export default UserDetailDeleteButton;
