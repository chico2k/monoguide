/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Disclosure } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Context } from '../../lib/Store/AppContext';
import NavigationUser from './NavigationUser';
import NavigationHamburger from './NavigationSmall/indesx';
import NavigationNotifications from './NavigationNotifications';
import NavigationLarge from './NavigationLarge';
import NavigationMobileButton from './NavigationMobileButton';
import { NavigationLinks } from './types';
import NavigationJoinButton from './NavigationJoinButton';
import { useAuth, useUser } from '@clerk/nextjs';

const navigation: NavigationLinks[] = [
  { name: 'Home', href: '/', current: true, authenticatedOnly: true },
  {
    name: 'Profiles',
    href: '/profiles',
    current: false,
    authenticatedOnly: true
  }
];

const Navbar = () => {
  const router = useRouter();

  const { isSignedIn } = useAuth();

  const { user } = useUser();

  const authenticated = false || isSignedIn;

  const myProfile =
    user && user.username ? `/profiles/${user.username}` : `/profiles/`;

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div
            className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"
            data-test="bla"
          >
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <NavigationMobileButton open={open} />
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <div className="hidden lg:block bold h-8 w-auto uppercase  text-green-600 font-extrabold text-xl">
                    ultigu
                  </div>
                </div>
                <NavigationLarge
                  navigationLinks={navigation}
                  currentPath={router.pathname}
                />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NavigationJoinButton authenticated={authenticated} />
                <NavigationNotifications authenticated={authenticated} />
                <NavigationUser
                  authenticated={authenticated}
                  profileLink={myProfile}
                />
              </div>
            </div>
          </div>

          <NavigationHamburger navigationLinks={navigation} />
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
