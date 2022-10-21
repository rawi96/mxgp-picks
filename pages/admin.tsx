import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Layout from '../components/Layout';
import RidersCrud from '../components/RidersCrud';
import prisma from '../lib/prisma';
import { Rider } from '../lib/types';

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
};

const useAdminRoute = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== 'loading' && !session.data?.user?.isAdmin) {
      router.push('/');
    }
  }, [session]);

  return session;
};

const Admin: FC<Props> = ({ serverSideRiders }) => {
  const session = useAdminRoute();

  return (
    <>
      {session.data?.user?.isAdmin ? (
        <Layout>
          <h1 className="text-xl font-semibold text-gray-900">Admin</h1>
          <RidersCrud serverSideRiders={serverSideRiders} />
        </Layout>
      ) : (
        <></>
      )}
      ;
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const serverSideRiders = await prisma.rider.findMany();
  return {
    props: { serverSideRiders },
  };
};

export default Admin;
