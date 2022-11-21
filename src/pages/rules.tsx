import { FC } from 'react';
import Layout from '../components/Layout';
import RaceCard from '../components/RaceCard';

const Rules: FC = () => {
  return (
    <Layout>
      <div className="flex justify-center">
        <h2 className="font-semibold text-gray-700 text-2xl mb-10">Scoring</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex flex-col md:mr-10 md:w-1/2">
          <p className="text-gray-700 text-base mb-10">
            To score points you must submit for each GP which riders you believe will take the top five position + Wildcard*.
            (The mxgp overall result is decisive). You can only submit until midnight before the race day. After that the
            picks are closed. The points are distributed as follows: If a rider places in the exact spot you predicted, you
            will get the following points:
          </p>
          <ul className="list-disc text-gray-700 text-base ml-4 mb-10">
            <li>1st Place = 25 Points</li>
            <li>2nd Place = 22 Points</li>
            <li>3rd Place = 20 Points</li>
            <li>4th Place = 18 Points</li>
            <li>5th Place = 16 Points</li>
            <li>Wildcard* = 25 Points</li>
          </ul>
        </div>
        <div className="flex flex-col md:ml-2 md:w-1/2">
          <p className="text-gray-700 text-base mb-10">
            If a rider places in the top 5 and you predicted him to be in the top 5 but he finishes not in the exact spot you
            predicted you get 10 points. If you have exactly the same number of points in a race as someone else. The person
            who picked first wins.
          </p>
          <p className="text-gray-700 text-base mb-10">
            <strong>* Wildcard: </strong>This is your last pick that&apos;s as valuable as your first place pick. We pick a
            placing (6th-20nd) and let you select a rider for that placement. If you get it right, you score 25 points!
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <h2 className="font-semibold text-gray-700 text-2xl mb-10 mt-20">Example</h2>
      </div>
      <RaceCard
        isLoading={false}
        index={0}
        race={{
          id: '',
          title: 'MXGP Switzerland',
          date: new Date('3-12-2022'),
          factor: 1,
          wildcardPos: 15,
          raceResult: {
            id: '',
            result: {
              id: '',
              first: {
                id: '91',
                firstname: 'Jeremy',
                lastname: 'Seewer',
                numberplate: 91,
              },
              second: {
                id: '92',
                firstname: 'Valentin',
                lastname: 'Guillod',
                numberplate: 92,
              },
              third: {
                id: '4',
                firstname: 'Arnaud',
                lastname: 'Tonus',
                numberplate: 4,
              },
              fourth: {
                id: '253',
                firstname: 'Kevin',
                lastname: 'Brumann',
                numberplate: 253,
              },
              fifth: {
                id: '243',
                firstname: 'Tim',
                lastname: 'Gajser',
                numberplate: 243,
              },
              wildcard: {
                id: '61',
                firstname: 'Jorge',
                lastname: 'Prado',
                numberplate: 61,
              },
            },
          },
          pick: {
            createdAt: new Date(),
            id: '',
            result: {
              id: '',
              first: {
                id: '91',
                firstname: 'Jeremy',
                lastname: 'Seewer',
                numberplate: 91,
              },
              second: {
                id: '84',
                firstname: 'Jeffrey',
                lastname: 'Herlings',
                numberplate: 84,
              },
              third: {
                id: '243',
                firstname: 'Tim',
                lastname: 'Gajser',
                numberplate: 4,
              },
              fourth: {
                id: '92',
                firstname: 'Valentin',
                lastname: 'Guillod',
                numberplate: 92,
              },
              fifth: {
                id: '959',
                firstname: 'Maxime',
                lastname: 'Renaux',
                numberplate: 959,
              },
              wildcard: {
                id: '61',
                firstname: 'Jorge',
                lastname: 'Prado',
                numberplate: 61,
              },
            },
          },
        }}
        type={'home'}
      />
    </Layout>
  );
};

export default Rules;
