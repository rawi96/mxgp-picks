import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Layout from '../components/Layout';

const useAdminRoute = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session.data?.user?.isAdmin) {
      router.push('/');
    }
  }, [session]);

  return session;
};

/*
Server-Side protection would be cleaner.
Unfortunately it doesn't work in the productive environment.
There you somehow ONLY get the email but not the isAdmin flag

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user.isAdmin) {
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

const Admin: FC = () => {
  const session = useAdminRoute();

  return <>{session.data?.user?.isAdmin ? <Layout>ADMIN</Layout> : <></>};</>;
};

export default Admin;
