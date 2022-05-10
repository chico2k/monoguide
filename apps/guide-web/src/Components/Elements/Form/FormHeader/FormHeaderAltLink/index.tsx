import React from 'react';
import Link from 'next/link';

interface IProps {
  href: string;
}

const FormHeaderAltLink: React.FC<IProps> = ({ href, children }) => {
  return (
    <p className="mt-2 text-center text-sm text-gray-600">
      or{' '}
      <Link href={href}>
        <a href="#" className="font-medium text-green-600 hover:text-green-500">
          {children}
        </a>
      </Link>
    </p>
  );
};

export default FormHeaderAltLink;
