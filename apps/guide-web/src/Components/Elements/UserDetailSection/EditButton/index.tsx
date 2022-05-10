import React from 'react';

export interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
}

const UserDetailEditButton: React.FC<IProps> = ({ children, ...props }) => {
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
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="32" height="32">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path
          fillRule="evenodd"
          d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default UserDetailEditButton;
