import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import useSWR from 'swr';
import Layout from '../components/Layout';
import RacesCrud from '../components/RacesCrud';
import RidersCrud from '../components/RidersCrud';
import TriggerScoreCalculation from '../components/TriggerScoreCalculation';

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

const useRaces = () => {
  const { data, error } = useSWR(`/api/races`);

  return {
    races: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const useRiders = () => {
  const { data, error } = useSWR(`/api/riders`);

  return {
    riders: data,
    isLoading: !error && !data,
    isError: error,
  };
};

const Admin: FC = () => {
  const session = useAdminRoute();
  const { races } = useRaces();
  const { riders } = useRiders();
  return (
    <>
      {session.data?.user?.isAdmin ? (
        <Layout>
          <div className="flex justify-center">
            <h2 className="font-semibold text-gray-700 text-2xl mb-10">Races</h2>
          </div>

          {races && riders && (
            <>
              <RacesCrud serverSideRaces={races} serverSideRiders={riders} />
              <div className="flex justify-center">
                <h2 className="font-semibold text-gray-700 text-2xl mt-20 mb-10">Riders</h2>
              </div>
            </>
          )}
          {riders && <RidersCrud serverSideRiders={riders} />}
          <div className="flex justify-center">
            <h2 className="font-semibold text-gray-700 text-2xl mt-20 mb-10">Score calculation</h2>
          </div>
          <TriggerScoreCalculation />
        </Layout>
      ) : (
        <></>
      )}
    </>
  );
};

export default Admin;
