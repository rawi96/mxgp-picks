import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Race, User } from '../lib/types/types';
import Layout from './Layout';
import UsersTable from './UsersTable';

type Props = {
  serverSideUsers: User[];
  serverSideRaces: Race[];
};

const Ranking: FC<Props> = ({ serverSideUsers, serverSideRaces }) => {
  const session = useSession();

  const loggedInUserId = session.data?.user.id;
  const indexOfLoggedInUser = serverSideUsers.findIndex((user) => user.id === loggedInUserId);

  const router = useRouter();
  const { raceId } = router.query;

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
              onChange={(e) => {
                const url = new URL(window.location.href);
                url.pathname = 'ranking/' + e.target.value;
                router.push(url.toString());
              }}
              name="filter"
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm"
              defaultValue={raceId ?? ''}
            >
              <option value="">Overall</option>
              {serverSideRaces.map((race) => (
                <option key={race.id} value={race.id}>
                  {race.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <UsersTable
        users={serverSideUsers}
        indexToMakeLoggedInUserVisible={indexOfLoggedInUser}
        filterRaceId={raceId ? raceId.toString() : undefined}
      />
    </Layout>
  );
};

export default Ranking;
