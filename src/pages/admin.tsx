import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Layout from '../components/Layout';
import RacesCrud from '../components/RacesCrud';
import RidersCrud from '../components/RidersCrud';
import TriggerScoreCalculation from '../components/TriggerScoreCalculation';
import { useRaces } from '../hooks/useRaces';
import { useRiders } from '../hooks/useRiders';

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
              <RacesCrud races={races} riders={riders} />
              <div className="flex justify-center">
                <h2 className="font-semibold text-gray-700 text-2xl mt-20 mb-10">Riders</h2>
              </div>
            </>
          )}
          {riders && <RidersCrud riders={riders} />}
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
