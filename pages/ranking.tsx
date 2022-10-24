import { GetStaticProps } from 'next';
import { useSession } from 'next-auth/react';
import { FC } from 'react';
import Layout from '../components/Layout';
import UsersTable from '../components/UsersTable';
import prisma from '../lib/prisma';
import { User } from '../lib/types';

type Props = {
  serverSideUsers: User[];
};

const Ranking: FC<Props> = ({ serverSideUsers }) => {
  const session = useSession();

  const loggedInUserId = session.data?.user.id;
  const indexOfLoggedInUser = serverSideUsers.findIndex((user) => user.id === loggedInUserId);

  return (
    <Layout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-700">Ranking</h1>
          <p className="mt-2 text-sm text-gray-700">
            Check out the current mxgp-picks ranking. Either overall or individually per race.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Filter
            </label>
            <select
              id="filter"
              name="filter"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              defaultValue="Overall"
            >
              <option>Overall</option>
              <option>MXGP Germany</option>
              <option>MXGP Switzerland</option>
            </select>
          </div>
        </div>
      </div>
      <UsersTable users={serverSideUsers} indexToMakeLoggedInUserVisible={indexOfLoggedInUser} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const serverSideUsers = await prisma.user.findMany({
    orderBy: {
      score: 'asc',
    },
  });

  const serverSideUsersWithPosition = serverSideUsers.map((user, index) => ({
    ...user,
    position: index + 1,
  }));

  return {
    props: {
      serverSideUsers: serverSideUsersWithPosition,
    },
    revalidate: 10,
  };
};

export default Ranking;
