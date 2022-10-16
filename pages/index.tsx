import type { GetStaticProps } from 'next';
import { FC } from 'react';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import SignUp from '../components/SignUp';
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({});
  return {
    props: { users },
    revalidate: 10,
  };
};

type Props = {
  users: any[];
};

const Index: FC<Props> = ({ users }) => {
  return (
    <Layout>
      {users.map((user) => (
        <div key={user.id} className="post">
          {user.firstname}
        </div>
      ))}
      <Modal>
        <SignUp />
      </Modal>
      <Footer />
    </Layout>
  );
};

export default Index;
