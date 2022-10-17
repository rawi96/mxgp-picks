import { useRouter } from 'next/router';
import { FC, useContext } from 'react';
import Layout from '../components/Layout';
import Login from '../components/Login';
import Modal from '../components/Modal';
import SignUp from '../components/SignUp';
import { ModalsContext } from '../context/modalsContext';

const Index: FC = () => {
  const router = useRouter();

  return (
    <Layout pathname={router.pathname}>
      <h1 className="text-xl font-semibold text-gray-900">Home</h1>
      <p className="mt-2 text-sm text-gray-700">
        Welcome to mxgp-picks.com. Here you can try to predict the results of the mxgp races as precisely as possible in
        order to collect points
      </p>
    </Layout>
  );
};

export default Index;
