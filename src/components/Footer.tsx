import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { adminNavigation, navigation } from './Layout';

export const Footer: FC = () => {
  const session = useSession();
  const sessionNavigation = session?.data?.user?.isAdmin ? adminNavigation : navigation;

  return (
    <>
      <footer className="lg:rounded-lg bg-red-50 px-5 py-6 shadow sm:px-6 -mt-5">
        <div className="mx-auto max-w-7xl overflow-hidden pt-20">
          <div className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
            <Link href="/">
              <a>
                <Image height="25.33" width="200" src="/images/logo_black.svg" alt="mxgp-picks" />
              </a>
            </Link>
          </div>
          <nav className="flex flex-wrap justify-center mt-5" aria-label="Footer">
            {sessionNavigation.map((item) => (
              <div key={item.name} className="px-5 py-2">
                <Link href={item.href}>
                  <a className="text-base text-red-500 hover:text-red-700">{item.name}</a>
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </footer>

      <footer className="fixed bottom-0 right-0 left-0 bg-red-700 px-5 py-3 sm:px-6 -mt-5">
        <p className="text-center text-base text-red-300">{new Date().getFullYear()} mxgp-picks.com</p>
      </footer>
    </>
  );
};

export default Footer;
