import { GetStaticProps } from 'next';
import { FC } from 'react';
import Layout from '../components/Layout';
import PersonalRanking from '../components/PersonalRanking';
import RacesCarousel from '../components/RacesCarousel';
import prisma from '../lib/prisma';
import RaceRepo from '../lib/repos/raceRepo';
import RiderRepo from '../lib/repos/riderRepo';
import UserRepo from '../lib/repos/userRepo';
import { Race, Rider, User } from '../lib/types';

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
      <RacesCarousel type="home" races={serverSideRaces} onEdit={() => {}} onDelete={() => {}} />
      <PersonalRanking users={serverSideUsers} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const serverSideRiders = await new RiderRepo(prisma).getAll();
  const serverSideRaces = await new RaceRepo(prisma).getAll();
  const serverSideUsers = await new UserRepo(prisma).getAllWithPosition();

  return {
    props: {
      serverSideRiders,
      serverSideRaces: JSON.parse(JSON.stringify(serverSideRaces)),
      serverSideUsers,
    },
    revalidate: 10,
  };
};

export default Index;
