import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Layout from '../components/Layout';
import RacesCrud from '../components/RacesCrud';
import RidersCrud from '../components/RidersCrud';
import prisma from '../lib/prisma';
import RaceRepo from '../lib/repos/raceRepo';
import RiderRepo from '../lib/repos/riderRepo';
import { Race, Rider } from '../lib/types';

/*
Server-Side protection would be cleaner.
Unfortunately it doesn't work in the productive environment.
There you somehow ONLY get the email but not the isAdmin flag

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user.isAdmin) {   <--- isAdmin doesn't exist ONLY in production mode
    return {
      props: { session },
    };
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
*/

type Props = {
  serverSideRiders: Rider[];
  serverSideRaces: Race[];
};

const useAdminRoute = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== 'loading' && !session.data?.user?.isAdmin) {
      router.push('/');
    }
  }, [session, router]);

  return session;
};

const Admin: FC<Props> = ({ serverSideRiders, serverSideRaces }) => {
  const session = useAdminRoute();

  return (
    <>
      {session.data?.user?.isAdmin ? (
        <Layout>
          <div className="flex justify-center">
            <h2 className="font-semibold text-gray-700 text-2xl mb-10">Races</h2>
          </div>

          <RacesCrud serverSideRaces={serverSideRaces} serverSideRiders={serverSideRiders} />
          <div className="flex justify-center">
            <h2 className="font-semibold text-gray-700 text-2xl mt-20 mb-10">Riders</h2>
          </div>
          <RidersCrud serverSideRiders={serverSideRiders} />
        </Layout>
      ) : (
        <></>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const serverSideRiders = await new RiderRepo(prisma).getAll();
  const serverSideRaces = await new RaceRepo(prisma).getAll();

  return {
    props: { serverSideRiders, serverSideRaces: JSON.parse(JSON.stringify(serverSideRaces)) },
  };
};

export default Admin;
