import React from 'react';
import { NavigationLinks } from '../types';
import Link from 'next/link';

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

interface IProps {
  navigationLinks: NavigationLinks[];
  currentPath: string;
}

const NavigationLarge: React.FC<IProps> = ({ navigationLinks, currentPath }) => {
  return (
    <div className="hidden sm:block sm:ml-6">
      <div className="flex space-x-4">
        {navigationLinks.map((item) => {
          const isCurrentPath = currentPath === item.href ? true : false;

          return (
            <Link href={item.href} key={item.name}>
              <a
                className={classNames(
                  isCurrentPath ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                )}
                aria-current={isCurrentPath ? 'page' : undefined}
              >
                {item.name}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationLarge;
