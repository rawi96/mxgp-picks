import { User } from '@prisma/client';
import { GetStaticProps } from 'next';
import { FC } from 'react';
import Layout from '../components/Layout';

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({});
  return {
    props: { users },
    revalidate: 10,
  };
};

type Props = {
  users: User[];
};

const Ranking: FC<Props> = ({ users }) => {
  return (
    <Layout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Ranking</h1>
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
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              defaultValue="Overall"
            >
              <option>Overall</option>
              <option>MXGP Germany</option>
              <option>MXGP Switzerland</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Position
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Username
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Score
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{user.id}</div>
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                              <span className="font-medium leading-none text-white">
                                {user.username.substring(0, 2).toUpperCase()}
                              </span>
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{user.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{user.score}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Ranking;
