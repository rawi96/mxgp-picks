import { GetStaticProps } from 'next';
import { FC } from 'react';
import Ranking from '../../components/Ranking';
import RaceRepo from '../../lib/repos/raceRepo';
import UserRepo from '../../lib/repos/userRepo';
import { Race, User } from '../../lib/types/types';
import prisma from '../../lib/utils/prisma';

type Props = {
  serverSideUsers: User[];
  serverSideRaces: Race[];
};

const RankingPage: FC<Props> = ({ serverSideUsers, serverSideRaces }) => {
  return <Ranking serverSideUsers={serverSideUsers} serverSideRaces={serverSideRaces} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const serverSideUsers = await new UserRepo(prisma).getAllWithPosition();
  const serverSideRaces = await new RaceRepo(prisma).getAll();

  return {
    props: {
      serverSideUsers,
      serverSideRaces: JSON.parse(JSON.stringify(serverSideRaces)),
    },
    revalidate: 10,
  };
};

export default RankingPage;
