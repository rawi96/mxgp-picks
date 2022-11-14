import { useSession } from 'next-auth/react';
import { FC } from 'react';
import { User } from '../lib/types/types';
import UsersTable from './UsersTable';

type Props = {
  users?: User[];
};

const usePersonalRanking = (users?: User[]) => {
  let usersToShow: User[] = [];

  const session = useSession();
  const loggedInUserId = session.data?.user.id;
  const indexOfLoggedInUser = users?.findIndex((user) => user.id === loggedInUserId);

  if (!users || !indexOfLoggedInUser) {
    return { session, usersToShow };
  }

  if (indexOfLoggedInUser < 3) {
    usersToShow = users.slice(0, 6);
  } else if (indexOfLoggedInUser > users.length - 3) {
    usersToShow = users.slice(users.length - 6, users.length);
  } else {
    usersToShow = users.slice(indexOfLoggedInUser - 3, indexOfLoggedInUser + 3);
  }

  const indexToMakeLoggedInUserVisible = usersToShow.findIndex((user) => user.id === loggedInUserId);

  return { session, usersToShow, indexOfLoggedInUser, indexToMakeLoggedInUserVisible };
};

const PersonalRanking: FC<Props> = ({ users }) => {
  const { session, usersToShow, indexOfLoggedInUser, indexToMakeLoggedInUserVisible } = usePersonalRanking(users);

  return (
    <>
      <div className="flex justify-center">
        <h2 className="font-semibold text-gray-700 text-2xl mt-16">
          {session.data?.user && users && indexToMakeLoggedInUserVisible && indexToMakeLoggedInUserVisible > -1 ? (
            <>You are on Position {users[indexOfLoggedInUser].position}!</>
          ) : (
            'Top 5 users'
          )}
        </h2>
      </div>
      <UsersTable
        indexToMakeLoggedInUserVisible={indexToMakeLoggedInUserVisible}
        users={
          session.data?.user && indexToMakeLoggedInUserVisible && indexToMakeLoggedInUserVisible > -1
            ? usersToShow
            : users?.slice(0, 5)
        }
      />
    </>
  );
};

export default PersonalRanking;
