import { GetServerSideProps } from 'next';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { FC } from 'react';
import Layout from '../components/Layout';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(session);

  if (session?.user.isAdmin) {
    console.log('isAdmin');
    return {
      props: { session },
    };
  }
  console.log('isNotAdmin');
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
