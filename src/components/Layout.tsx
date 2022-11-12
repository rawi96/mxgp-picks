import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, Fragment, ReactNode, useContext } from 'react';
import { ModalsContext } from '../context/modalsContext';
import { classNames } from '../lib/utils/utils';
import Footer from './Footer';

export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Ranking', href: '/ranking' },
  { name: 'Rules', href: '/rules' },
];

export const adminNavigation = [...navigation, { name: 'Admin', href: '/admin' }];

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  const { setLoginModalOpen, setSignUpModalOpen } = useContext(ModalsContext);
  const session = useSession();
  const router = useRouter();
  const pathname = (router && router.pathname) || '';

  const sessionNavigation = session?.data?.user?.isAdmin ? adminNavigation : navigation;

  const MobileMenu = (
    <Disclosure.Panel className="border-b border-gray-700 md:hidden">
      <div className="space-y-1 px-2 py-3 sm:px-3">
        {sessionNavigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as="a"
            href={item.href}
            className={classNames(
              pathname === item.href ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-600 hover:text-white',
              'block px-3 py-2 rounded-md text-base font-medium'
            )}
            aria-current={pathname === item.href ? 'page' : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
      <div className="border-t border-gray-700 pt-4 pb-3">
        {session.data?.user ? (
          <>
            <div className="flex items-center px-5">
              <div className="flex-shrink-0"></div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">{session.data.user.username}</div>
                <div className="text-sm font-medium leading-none text-gray-400">{session.data.user.email}</div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              <Disclosure.Button
                as="a"
                href={'/profile'}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-600 hover:text-white"
              >
                Profile
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => signOut()}
              >
                Sign out
              </Disclosure.Button>
            </div>
          </>
        ) : (
          <>
            <div className="mt-3 space-y-1 px-2">
              <Disclosure.Button
                as="a"
                onClick={() => setSignUpModalOpen(true)}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-600 hover:text-white cursor-pointer whitespace-nowrap"
              >
                Sign up
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-600 hover:text-white cursor-pointer"
                onClick={() => setLoginModalOpen(true)}
              >
                Login
              </Disclosure.Button>
            </div>
          </>
        )}
      </div>
    </Disclosure.Panel>
  );

  return (
    <div data-test-id="layout" className="min-h-full">
      <div className="bg-gray-700 pb-32">
        <Disclosure as="nav" className="bg-gray-700">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="border-b border-gray-700">
                  <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <Link href="/">
                          <a>
                            <Image height="31.6" width="250" src="/images/logo_white.svg" alt="mxgp-picks" />
                          </a>
                        </Link>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {sessionNavigation.map((item) => (
                            <Link key={item.name} href={item.href}>
                              <a
                                className={classNames(
                                  pathname === item.href
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-300 hover:bg-gray-600 hover:text-white',
                                  'px-3 py-2 rounded-md text-sm font-medium'
                                )}
                                aria-current={pathname === item.href ? 'page' : undefined}
                              >
                                {item.name}
                              </a>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        {session.data?.user ? (
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
                                <span className="sr-only">Open user menu</span>
                                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
                                  <span className="text-sm font-medium leading-none text-white">
                                    {session.data.user.username && session.data.user.username.substring(0, 2).toUpperCase()}
                                  </span>
                                </span>
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
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                  {({ active }) => (
                                    <Link href={'/profile'}>
                                      <a
                                        className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                        )}
                                      >
                                        Profile
                                      </a>
                                    </Link>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      onClick={() => signOut()}
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700 cursor-pointer whitespace-nowrap	'
                                      )}
                                    >
                                      Sign out
                                    </a>
                                  )}
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        ) : (
                          <>
                            <a
                              tabIndex={0}
                              onClick={() => setSignUpModalOpen(true)}
                              onKeyDown={(e) => e.key === 'Enter' && setSignUpModalOpen(true)}
                              className="text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer whitespace-nowrap"
                            >
                              Sign up
                            </a>
                            <a
                              tabIndex={0}
                              onClick={() => setLoginModalOpen(true)}
                              onKeyDown={(e) => e.key === 'Enter' && setLoginModalOpen(true)}
                              className="text-gray-300 hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                            >
                              Login
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-700 p-2 text-gray-400 hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
              </div>
              {MobileMenu}
            </>
          )}
        </Disclosure>
      </div>

      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-gray-50 px-8 py-8 shadow">{children}</div>
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;
