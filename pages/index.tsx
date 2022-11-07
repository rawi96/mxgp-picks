import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import Layout from '../components/Layout';
import PersonalRanking from '../components/PersonalRanking';
import PicksCrud from '../components/PicksCrud';
import prisma from '../lib/prisma';
import PickRepo from '../lib/repos/pickRepo';
import RaceRepo from '../lib/repos/raceRepo';
import RiderRepo from '../lib/repos/riderRepo';
import UserRepo from '../lib/repos/userRepo';
import { Pick, Race, Rider, User } from '../lib/types';

type Props = {
  serverSideRiders: Rider[];
  serverSideRaces: Race[];
  serverSideUsers: User[];
};

const Index: FC<Props> = ({ serverSideRaces, serverSideRiders, serverSideUsers }) => {
  return (
    <Layout>
      <div className="flex justify-center">
        <h2 className="font-semibold text-gray-700 text-2xl mb-10">Races</h2>
      </div>
      <PicksCrud serverSideRaces={serverSideRaces} serverSideRiders={serverSideRiders} />
      <PersonalRanking users={serverSideUsers} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId = session?.user.id;
  console.log('getserversideprops', session);

  const serverSideRiders = await new RiderRepo(prisma).getAll();
  const serverSideRaces = await new RaceRepo(prisma).getAll();
  const serverSideUsers = await new UserRepo(prisma).getAllWithPosition();
  let serverSidePicks: Pick[] | [] = [];
  if (userId) {
    serverSidePicks = await new PickRepo(prisma).getByUserId(userId);
  }

  const racesWithPicks = serverSideRaces.map((race) => {
    const pickForRace = serverSidePicks.find((pick) => race.id === pick.raceId);
    return { ...race, pick: pickForRace };
  });

  return {
    props: {
      serverSideRiders,
      serverSideRaces: JSON.parse(JSON.stringify(racesWithPicks)),
      serverSideUsers,
    },
  };
};

export default Index;
