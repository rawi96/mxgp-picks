import { FC } from 'react';
import Layout from '../components/Layout';
import PersonalRanking from '../components/PersonalRanking';
import PicksCrud from '../components/PicksCrud';
import { useRaces } from '../hooks/useRaces';
import { useRiders } from '../hooks/useRiders';
import { useUsers } from '../hooks/useUsers';

const Index: FC = () => {
  const { races } = useRaces();
  const { users } = useUsers();
  const { riders } = useRiders();
  console.log(races);
  return (
    <Layout>
      <div className="flex justify-center">
        <h2 className="font-semibold text-gray-700 text-2xl mb-10">Races</h2>
      </div>
      {races && riders && <PicksCrud races={races} riders={riders} />}
      {users && <PersonalRanking users={users} />}
    </Layout>
  );
};

export default Index;
