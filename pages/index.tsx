import { User } from '@prisma/client';
import type { GetStaticProps } from 'next';
import { FC } from 'react';
import Layout from '../components/Layout';
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const users = await prisma.user.findMany({});
  return {
    props: { users },
    revalidate: 10,
  };
};

type Props = {
  users: User[];
};

const Index: FC<Props> = ({ users }) => {
  return (
    <Layout>
      {users.map((user) => (
        <div key={user.id} className="post">
          {user.firstname}
        </div>
      ))}
    </Layout>
  );
};

export default Index;
