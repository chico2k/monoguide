import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NextImage from 'next/image';
import { useAuth } from '@clerk/nextjs';

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

interface IProps {
  authenticated: boolean;
  profileLink: string;
}

const NavigationUser: React.FC<IProps> = ({ authenticated, profileLink }) => {
  const router = useRouter();

  const { signOut } = useAuth();

  if (!authenticated) return null;

  return (
    <Menu as="div" className="ml-3 relative z-10">
      <div>
        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 h-8 w-8">
          <span className="sr-only">Open user menu</span>
          <NextImage
            blurDataURL={
              'data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAJABADASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAQFBv/EAB0QAAEEAgMAAAAAAAAAAAAAAAEAAgMFETMEMnH/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAGBEAAgMAAAAAAAAAAAAAAAAAAAEREiH/2gAMAwEAAhEDEQA/AKFhaQgZYQjhXEZb2GVlrbSUlW7neIV2RM//2Q=='
            }
            src={
              'http://localhost:4566/development/IMAGE/d153cd11-6b84-474f-96de-0980487f102d/7525ea73-ad01-483a-a7ed-ecc30dae93b7.jpg'
            }
            // className="h-8 w-8 rounded-full"
            objectFit="cover"
            draggable="false"
            layout="fill"
            placeholder="blur"
            className="h-8 w-8 rounded-full"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => {
              return (
                <div>
                  <Link href={profileLink}>
                    <a
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Your Profile
                    </a>
                  </Link>
                </div>
              );
            }}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => {
              return (
                <div>
                  <Link href={'/cockpit'}>
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      Cockpit
                    </a>
                  </Link>
                </div>
              );
            }}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                onClick={async () => {
                  try {
                    const resp = await signOut();

                    console.log('resp out', resp);
                    router.push('/');
                  } catch {
                    return;
                  }
                }}
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default NavigationUser;
