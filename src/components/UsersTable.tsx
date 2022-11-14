import { FC } from 'react';
import { User } from '../lib/types/types';

type Props = {
  users: User[];
  indexToMakeLoggedInUserVisible: number;
  filterRaceId?: string;
};

const UsersTable: FC<Props> = ({ users, indexToMakeLoggedInUserVisible, filterRaceId }) => {
  const getScoreOrFilteredScore = (user: User) => {
    if (!filterRaceId) {
      return user.score;
    }
    if (!user.scorePerRace) {
      return 0;
    }
    const scorePerRace: { [key: string]: number } = JSON.parse(user.scorePerRace);
    return scorePerRace[filterRaceId] ?? 0;
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-700 sm:pl-6">
                    Position
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-700">
                    Username
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-700">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user, index) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className={`text-gray-700 ${indexToMakeLoggedInUserVisible === index && 'font-bold'}`}>
                        {user.position}
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-600">
                            <span className="font-medium leading-none text-white">
                              {user.username && user.username.substring(0, 2).toUpperCase()}
                            </span>
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className={`text-gray-700 ${indexToMakeLoggedInUserVisible === index && 'font-bold'}`}>
                            {user.username}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className={`text-gray-700 ${indexToMakeLoggedInUserVisible === index && 'font-bold'}`}>
                        {getScoreOrFilteredScore(user)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;
