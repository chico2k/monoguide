import React from 'react';
import { Disclosure } from '@headlessui/react';
import { NavigationLinks } from '../types';

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

interface IProps {
  navigationLinks: NavigationLinks[];
}

const NavigationHamburger: React.FC<IProps> = ({ navigationLinks }) => {
  return (
    <Disclosure.Panel className="sm:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navigationLinks.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium',
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </a>
        ))}
      </div>
    </Disclosure.Panel>
  );
};

export default NavigationHamburger;
