import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import Layout from '../components/Layout';
import { User } from '../lib/types';

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

type Props = {
  session: Session;
};

const Admin: FC<Props> = ({ session }) => {
  return <Layout>ADMIN</Layout>;
};

export default Admin;
