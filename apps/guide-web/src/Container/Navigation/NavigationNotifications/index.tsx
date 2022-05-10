import React from 'react';
import { BellIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import NotificationPanel from '../../../Components/NotificationPanel';
interface IProps {
  authenticated: boolean;
}

const NavigationNotifications: React.FC<IProps> = ({ authenticated }) => {
  if (!authenticated) return null;

  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <NotificationPanel isOpen={isOpen} setOpen={setOpen} />
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </>
  );
};

export default NavigationNotifications;
