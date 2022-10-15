import { FC, ReactNode } from 'react';
import { Navigation } from './Navigation';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-600">
      <Navigation />
      {children}
    </div>
  );
};
