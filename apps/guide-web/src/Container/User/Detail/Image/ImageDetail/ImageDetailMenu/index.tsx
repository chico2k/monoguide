import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { MdArrowDropDown } from 'react-icons/md';
import useImageSetAvatar from '../../Hooks/useImageSetAvatar';
import { ImageHits_Inner } from '../../../../../../../generated/graphql';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

interface IProps {
  image: ImageHits_Inner;
  setLoading: (state: boolean) => void;
}

export default function ImageDetailMenu({ image, setLoading }: IProps) {
  const { imageSetAvatarHandler } = useImageSetAvatar();
  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-600">
          Options
          <MdArrowDropDown className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="submit"
                    onClick={async () => await imageSetAvatarHandler({ image, setLoading })}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm',
                    )}
                  >
                    Set Profile Image
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
