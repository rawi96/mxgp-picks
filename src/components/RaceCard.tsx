import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Race } from '../lib/types/types';
import { dateToString, dateToStringWithTime, isNotYetMidnightBeforeRace } from '../lib/utils/utils';
import Spinner from './Spinner';

type Props = {
  race?: Race;
  index: number;
  isLoadingRaces?: boolean;
  isLoading: boolean;
  onEdit?: (race: Race) => void;
  onDelete?: (id: string) => void;
  onPick?: (race: Race) => void;
  onEditPick?: (race: Race) => void;
  type: 'admin' | 'home';
  hardCodedTotal?: number;
};

const Placeholder = () => (
  <svg
    className="animate-pulse"
    xmlns="http://www.w3.org/2000/svg"
    width="500"
    height="300"
    viewBox="0 0 500 300"
    fill="none"
  >
    <rect width="500" height="300" rx="4" fill="#374151" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M435.728 374.699C442.49 374.699 447.972 369.17 447.972 362.349C447.972 355.529 442.49 350 435.728 350C428.966 350 423.484 355.529 423.484 362.349C423.484 369.17 428.966 374.699 435.728 374.699ZM401.84 449.481H323.72C322.935 449.481 322.456 448.618 322.871 447.952L377.41 360.384C377.796 359.765 378.685 359.743 379.086 360.351C383.293 366.72 402.278 395.489 418.118 419.866L435.099 392.44C435.476 391.832 436.35 391.805 436.765 392.387L476.23 447.899C476.699 448.557 476.237 449.47 475.429 449.478L437.22 449.854L401.84 449.481Z"
      fill="#6B7280"
    />
  </svg>
);

const getScoreFor = (
  type: 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'wildcard' | 'total',
  race?: Race,
  scorePerRace?: string | null
) => {
  if (!race?.raceResult) {
    return 'TODO stats';
  }

  const firstResult = race.raceResult.result.first.id;
  const secondResult = race.raceResult.result.second.id;
  const thirdResult = race.raceResult.result.third.id;
  const fourthResult = race.raceResult.result.fourth.id;
  const fifthResult = race.raceResult.result.fifth.id;
  const wildcardResult = race.raceResult.result.wildcard.id;

  const inTop5bonus = 5 * race.factor;

  switch (type) {
    case 'first':
      const firstPick = race.pick?.result?.first.id;
      if (firstPick === firstResult) {
        return 25 * race.factor;
      } else if (
        firstPick === secondResult ||
        firstPick === thirdResult ||
        firstPick === fourthResult ||
        firstPick === fifthResult
      ) {
        return inTop5bonus;
      }
      return 0;

    case 'second':
      const secondPick = race.pick?.result?.second.id;
      if (secondPick === secondResult) {
        return 22 * race.factor;
      } else if (
        secondPick === firstResult ||
        secondPick === thirdResult ||
        secondPick === fourthResult ||
        secondPick === fifthResult
      ) {
        return inTop5bonus;
      }
      return 0;

    case 'third':
      const thirdPick = race.pick?.result?.third.id;
      if (thirdPick === thirdResult) {
        return 20 * race.factor;
      } else if (
        thirdPick === firstResult ||
        thirdPick === secondResult ||
        thirdPick === fourthResult ||
        thirdPick === fifthResult
      ) {
        return inTop5bonus;
      }
      return 0;

    case 'fourth':
      const fourthPick = race.pick?.result?.fourth.id;
      if (fourthPick === fourthResult) {
        return 18 * race.factor;
      } else if (
        fourthPick === firstResult ||
        fourthPick === secondResult ||
        fourthPick === thirdResult ||
        fourthPick === fifthResult
      ) {
        return inTop5bonus;
      }
      return 0;
    case 'fifth':
      const fifthPick = race.pick?.result?.fifth.id;
      if (fifthPick === fifthResult) {
        return 16 * race.factor;
      } else if (
        fifthPick === firstResult ||
        fifthPick === secondResult ||
        fifthPick === thirdResult ||
        fifthPick === fourthResult
      ) {
        return inTop5bonus;
      }
      return 0;

    case 'wildcard':
      const wildcardPick = race.pick?.result?.wildcard.id;
      if (wildcardPick === wildcardResult) {
        const reward = 25 * race.factor;
        return reward;
      }
      return 0;

    case 'total':
      const json = JSON.parse(scorePerRace || '{}');
      if (!json) {
        return 0;
      }
      return json[race.id]?.score || 0;
    default:
      return 0;
  }
};

const RaceCard: FC<Props> = ({
  race,
  index,
  onEdit,
  onDelete,
  onPick,
  onEditPick,
  type,
  isLoadingRaces,
  isLoading,
  hardCodedTotal,
}) => {
  const session = useSession();
  const scorePerRace = session.data?.user.scorePerRace;
  return (
    <div className="grid place-items-center">
      <div className="lg:max-w-lg sm:max-w-sm max-w-xs bg-white rounded-lg shadow-md mb-8">
        <div className="relative">
          {isLoadingRaces ? (
            <Placeholder />
          ) : (
            <Image
              className="rounded-t-lg brightness-50"
              src={`/images/races/${index % 13}.png`}
              alt={race?.title}
              width={500}
              height={300}
            />
          )}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
            {race && (
              <>
                <p className="text-3xl font-bold">{race.title}</p>
                <p className="mt-3 text-xl">{dateToString(race.date)}</p>
              </>
            )}
          </div>
        </div>
        <div className="p-5 overflow-auto">
          <table className="divide-y divide-red-300 m-auto w-full">
            <thead className="bg-red-50">
              <tr>
                <th
                  scope="col"
                  className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-red-900 sm:pl-6 ${
                    race?.raceResult ? 'w-1/4' : 'w-1/3'
                  }`}
                >
                  Position
                </th>
                {race?.raceResult && (
                  <th
                    scope="col"
                    className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-red-900 sm:pl-6 ${
                      race?.raceResult ? 'w-1/4' : 'w-1/3'
                    }`}
                  >
                    Result
                  </th>
                )}
                {type === 'home' && (
                  <th
                    scope="col"
                    className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-red-900 sm:pl-6 ${
                      race?.raceResult ? 'w-1/4' : 'w-1/3'
                    }`}
                  >
                    Your Pick
                  </th>
                )}
                {race?.raceResult && type === 'home' && (
                  <th
                    scope="col"
                    className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-red-900 sm:pl-6 ${
                      race?.raceResult ? 'w-1/4' : 'w-1/3'
                    }`}
                  >
                    Score
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-red-200 bg-white">
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-red-900 sm:pl-6">1</td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.raceResult?.result.first.firstname} {race?.raceResult?.result.first.lastname}
                  </td>
                )}
                {type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.pick?.result?.first.firstname} {race?.pick?.result?.first.lastname}
                  </td>
                )}
                {race?.raceResult && type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">{getScoreFor('first', race)}</td>
                )}
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-red-900 sm:pl-6">2</td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.raceResult?.result.second.firstname} {race?.raceResult?.result.second.lastname}
                  </td>
                )}
                {type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.pick?.result?.second.firstname} {race?.pick?.result?.second.lastname}
                  </td>
                )}
                {race?.raceResult && type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">{getScoreFor('second', race)}</td>
                )}
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-red-900 sm:pl-6">3</td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.raceResult?.result.third.firstname} {race?.raceResult?.result.third.lastname}
                  </td>
                )}
                {type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.pick?.result?.third.firstname} {race?.pick?.result?.third.lastname}
                  </td>
                )}
                {race?.raceResult && type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">{getScoreFor('third', race)}</td>
                )}
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-red-900 sm:pl-6">4</td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.raceResult?.result.fourth.firstname} {race?.raceResult?.result.fourth.lastname}
                  </td>
                )}
                {type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.pick?.result?.fourth.firstname} {race?.pick?.result?.fourth.lastname}
                  </td>
                )}
                {race?.raceResult && type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">{getScoreFor('fourth', race)}</td>
                )}
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-red-900 sm:pl-6">5</td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.raceResult?.result.fifth.firstname} {race?.raceResult?.result.fifth.lastname}
                  </td>
                )}
                {type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.pick?.result?.fifth.firstname} {race?.pick?.result?.fifth.lastname}
                  </td>
                )}
                {race?.raceResult && type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">{getScoreFor('fifth', race)}</td>
                )}
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-red-900 sm:pl-6">
                  {race?.wildcardPos}
                </td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.raceResult?.result.wildcard.firstname} {race?.raceResult?.result.wildcard.lastname}
                  </td>
                )}
                {type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">
                    {race?.pick?.result?.wildcard.firstname} {race?.pick?.result?.wildcard.lastname}
                  </td>
                )}
                {race?.raceResult && type === 'home' && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500">{getScoreFor('wildcard', race)}</td>
                )}
              </tr>
              {race?.raceResult && type === 'home' && (
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-red-900 sm:pl-6"></td>
                  {race?.raceResult && <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500"></td>}
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-red-500"></td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm font-bold">
                    {hardCodedTotal ?? getScoreFor('total', race, scorePerRace)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center mt-10">
            {type === 'admin' && race ? (
              <>
                <button
                  onClick={() => !isLoading && onEdit && onEdit(race)}
                  type="button"
                  disabled={isLoading}
                  className="inline-flex justify-center mr-2 w-full items-center rounded-md border border-transparent bg-red-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      ...Loading
                    </>
                  ) : (
                    <>
                      <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      Edit
                    </>
                  )}
                </button>
                <button
                  onClick={() => !isLoading && onDelete && onDelete(race?.id)}
                  type="button"
                  disabled={isLoading}
                  className="inline-flex justify-center ml-2 w-full items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      ...Loading
                    </>
                  ) : (
                    <>
                      <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                      Delete
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                {race && !race?.pick && !race?.raceResult && isNotYetMidnightBeforeRace(race.date) && (
                  <button
                    onClick={() => !isLoading && onPick && onPick(race)}
                    type="button"
                    disabled={isLoading}
                    className="inline-flex justify-center mr-2 w-full items-center rounded-md border border-transparent bg-red-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    {isLoading ? (
                      <>
                        <Spinner />
                        ...Loading
                      </>
                    ) : (
                      'Pick your Top 5!'
                    )}
                  </button>
                )}
                {race?.pick && !race?.raceResult && isNotYetMidnightBeforeRace(race.date) && (
                  <button
                    onClick={() => !isLoading && onEditPick && onEditPick(race)}
                    type="button"
                    disabled={isLoading}
                    className="inline-flex justify-center mr-2 w-full items-center rounded-md border border-transparent bg-red-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    {isLoading ? (
                      <>
                        <Spinner />
                        ...Loading
                      </>
                    ) : (
                      <>
                        <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                        Edit your pick
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-red-500 mb-16">
        {race?.raceResult && type === 'home' ? (
          <>
            Check your{' '}
            <Link href={`/ranking/${race?.id}`}>
              <a className="text-red-700 hover:text-red-900 underline font-medium cursor-pointer">Ranking</a>
            </Link>{' '}
            for this race.
          </>
        ) : (
          <>{race?.pick && type === 'home' && <>Picked at: {dateToStringWithTime(race?.pick?.createdAt)}</>}</>
        )}
      </div>
    </div>
  );
};

export default RaceCard;
