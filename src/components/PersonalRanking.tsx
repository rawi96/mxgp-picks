import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { User } from '../lib/types';
import UsersTable from './UsersTable';

type Props = {
  users: User[];
};

const PersonalRanking: FC<Props> = ({ users }) => {
  const session = useSession();

  const loggedInUserId = session.data?.user.id;
  const indexOfLoggedInUser = users.findIndex((user) => user.id === loggedInUserId);

  const sliceOfUsers = users.slice(indexOfLoggedInUser - 3, indexOfLoggedInUser + 3);

  const indexToMakeLoggedInUserVisible = sliceOfUsers.findIndex((user) => user.id === loggedInUserId);

  return (
    <>
      <div className="flex justify-center">
        <h2 className="font-semibold text-gray-700 text-2xl mt-16">
          {session.data?.user && indexToMakeLoggedInUserVisible > -1 ? (
            <>You are on Position {users[indexOfLoggedInUser].position}!</>
          ) : (
            'Top 5 users'
          )}
        </h2>
      </div>
      <UsersTable
        indexToMakeLoggedInUserVisible={indexToMakeLoggedInUserVisible}
        users={session.data?.user && indexToMakeLoggedInUserVisible > -1 ? sliceOfUsers : users.slice(0, 5)}
      />
    </>
  );
};

export default PersonalRanking;
