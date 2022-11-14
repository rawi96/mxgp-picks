import { GetServerSideProps } from 'next';
import { FC } from 'react';
import Ranking from '../../components/Ranking';
import PickRepo from '../../lib/repos/pickRepo';
import RaceRepo from '../../lib/repos/raceRepo';
import RaceResultRepo from '../../lib/repos/raceResultRepo';
import ResultRepo from '../../lib/repos/resultRepo';
import UserRepo from '../../lib/repos/userRepo';
import RaceService from '../../lib/services/raceService';
import UserService from '../../lib/services/userService';
import { Race, User } from '../../lib/types/types';
import prisma from '../../lib/utils/prisma';

type Props = {
  serverSideUsers: User[];
  serverSideRaces: Race[];
};

const FilteredRankingPage: FC<Props> = ({ serverSideUsers, serverSideRaces }) => {
  return <Ranking serverSideUsers={serverSideUsers} serverSideRaces={serverSideRaces} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userService = new UserService(new UserRepo(prisma), new RaceRepo(prisma));
  const raceService = new RaceService(
    new RaceRepo(prisma),
    new PickRepo(prisma),
    new RaceResultRepo(prisma),
    new ResultRepo(prisma)
  );

  let serverSideUsers: User[] = [];

  if (context.params?.raceId) {
    serverSideUsers = await userService.getAllWithPositionPerRace(context.params.raceId.toString());
  } else {
    serverSideUsers = await userService.getAllWithPosition();
  }

  const serverSideRaces = await raceService.getAllRaces();

  return {
    props: {
      serverSideUsers,
      serverSideRaces: JSON.parse(JSON.stringify(serverSideRaces)),
    },
  };
};

export default FilteredRankingPage;
