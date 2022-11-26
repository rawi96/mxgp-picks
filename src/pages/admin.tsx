import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import Layout from '../components/Layout';
import RacesCrud from '../components/RacesCrud';
import RidersCrud from '../components/RidersCrud';
import TriggerScoreCalculation from '../components/TriggerScoreCalculation';
import { useFavoriteRider } from '../hooks/useFavoriteRider';
import { useRaces } from '../hooks/useRaces';
import { useRiders } from '../hooks/useRiders';
import { useUsers } from '../hooks/useUsers';

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
  const { races, mutateRaces, isLoadingRaces } = useRaces();
  const { riders, mutateRiders } = useRiders();
  const { favoriteRider } = useFavoriteRider();
  const { mutateUsers } = useUsers();
  return (
    <>
      {session.data?.user?.isAdmin ? (
        <Layout>
          <div className="flex justify-center">
            <h2 className="font-semibold text-gray-700 text-2xl mb-10">Races</h2>
          </div>

          <RacesCrud races={races} riders={riders} mutateRaces={mutateRaces} isLoadingRaces={isLoadingRaces} />
          <div className="flex justify-center">
            <h2 className="font-semibold text-gray-700 text-2xl mt-20 mb-10">Riders</h2>
          </div>

          <RidersCrud riders={riders} mutateRiders={mutateRiders} />
          <div className="flex justify-center">
            <h2 className="font-semibold text-gray-700 text-2xl mt-20 mb-10">Score calculation</h2>
          </div>
          <TriggerScoreCalculation mutateUsers={mutateUsers} />
          <div className="flex justify-center">
            <h2 className="font-semibold text-gray-700 text-2xl mt-20 mb-5">Favorite Rider</h2>
          </div>
          <div className="flex justify-center">
            <p className="mt-2 text-sm text-gray-700">
              #{favoriteRider?.numberplate} {favoriteRider?.firstname} {favoriteRider?.lastname}
            </p>
          </div>
        </Layout>
      ) : (
        <></>
      )}
    </>
  );
};

export default Admin;
