import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { navigation } from './Layout';

const Footer: FC = () => {
  return (
    <>
      <footer className="rounded-lg bg-white px-5 py-6 shadow sm:px-6 -mt-5">
        <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
          <nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <Link href="/">
              <a>
                <Image height="40" width="200" src="/images/logo_black.svg" alt="mxgp-picks" />
              </a>
            </Link>
            {navigation.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <Link href={item.href}>
                  <a className="text-base text-gray-500 hover:text-gray-900">{item.name}</a>
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </footer>

      <footer className="fixed bottom-0 right-0 left-0 bg-gray-800 px-5 py-6 sm:px-6 -mt-5">
        <p className="text-center text-base text-gray-400">
          &copy; {new Date().getFullYear()} mxgp-picks.com, All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;