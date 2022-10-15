import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="bg-slate-600">
      <nav data-test-id="navigation">NAVIGATION</nav>
      {children}
    </div>
  );
};
