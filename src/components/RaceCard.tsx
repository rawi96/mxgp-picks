import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { FC } from 'react';
import { Race } from '../lib/types/types';
import { dateToString } from '../lib/utils/utils';

type Props = {
  race?: Race;
  index: number;
  onEdit?: (race: Race) => void;
  onDelete?: (id: string) => void;
  onPick?: (race: Race) => void;
  onEditPick?: (race: Race) => void;
  type: 'admin' | 'home';
};

const RaceCard: FC<Props> = ({ race, index, onEdit, onDelete, onPick, onEditPick, type }) => {
  return (
    <div className="grid place-items-center">
      <div className="lg:max-w-lg sm:max-w-sm max-w-xs bg-white rounded-lg shadow-md mb-20">
        <div className="relative">
          <Image
            className="rounded-t-lg brightness-50"
            src={`/images/races/${index % 13}.png`}
            alt={race?.title}
            width={500}
            height={300}
          />
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
          <table className="divide-y divide-gray-300 m-auto w-full">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 ${
                    race?.raceResult ? 'w-1/4' : 'w-1/3'
                  }`}
                >
                  Position
                </th>
                {race?.raceResult && (
                  <th
                    scope="col"
                    className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 ${
                      race?.raceResult ? 'w-1/4' : 'w-1/3'
                    }`}
                  >
                    Result
                  </th>
                )}
                <th
                  scope="col"
                  className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 ${
                    race?.raceResult ? 'w-1/4' : 'w-1/3'
                  }`}
                >
                  Your Pick
                </th>
                <th
                  scope="col"
                  className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 ${
                    race?.raceResult ? 'w-1/4' : 'w-1/3'
                  }`}
                >
                  {race?.raceResult ? 'Score' : 'Stats'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">1</td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {race?.raceResult?.result.first.firstname} {race?.raceResult?.result.first.lastname}
                  </td>
                )}
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.pick?.result?.first.firstname} {race?.pick?.result?.first.lastname}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.raceResult ? (race?.raceResult.result.first.id === race?.pick?.result?.first.id ? 25 : 0) : 'TODO'}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">2</td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {race?.raceResult?.result.second.firstname} {race?.raceResult?.result.second.lastname}
                  </td>
                )}
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.pick?.result?.second.firstname} {race?.pick?.result?.second.lastname}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.raceResult
                    ? race?.raceResult.result.second.id === race?.pick?.result?.second.id
                      ? 22
                      : 0
                    : 'TODO'}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">3</td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {race?.raceResult?.result.third.firstname} {race?.raceResult?.result.third.lastname}
                  </td>
                )}
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.pick?.result?.third.firstname} {race?.pick?.result?.third.lastname}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.raceResult ? (race?.raceResult.result.third.id === race?.pick?.result?.third.id ? 20 : 0) : 'TODO'}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">4</td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {race?.raceResult?.result.fourth.firstname} {race?.raceResult?.result.fourth.lastname}
                  </td>
                )}
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.pick?.result?.fourth.firstname} {race?.pick?.result?.fourth.lastname}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.raceResult
                    ? race?.raceResult.result.fourth.id === race?.pick?.result?.fourth.id
                      ? 18
                      : 0
                    : 'TODO'}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">5</td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {race?.raceResult?.result.fifth.firstname} {race?.raceResult?.result.fifth.lastname}
                  </td>
                )}
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.pick?.result?.fifth.firstname} {race?.pick?.result?.fifth.lastname}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.raceResult ? (race?.raceResult.result.fifth.id === race?.pick?.result?.fifth.id ? 16 : 0) : 'TODO'}
                </td>
              </tr>
              <tr>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {race?.wildcardPos}
                </td>
                {race?.raceResult && (
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {race?.raceResult?.result.wildcard.firstname} {race?.raceResult?.result.wildcard.lastname}
                  </td>
                )}
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.pick?.result?.wildcard.firstname} {race?.pick?.result?.wildcard.lastname}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {race?.raceResult
                    ? race?.raceResult.result.wildcard.id === race?.pick?.result?.wildcard.id
                      ? 25
                      : 0
                    : 'TODO'}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center mt-10">
            {type === 'admin' && race ? (
              <>
                <button
                  onClick={() => onEdit && onEdit(race)}
                  type="button"
                  className="inline-flex justify-center mr-2 w-full items-center rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete && onDelete(race?.id)}
                  type="button"
                  className="inline-flex justify-center ml-2 w-full items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  Delete
                </button>
              </>
            ) : (
              <>
                {race && !race?.pick && !race?.raceResult && (
                  <button
                    onClick={() => onPick && onPick(race)}
                    type="button"
                    className="inline-flex justify-center mr-2 w-full items-center rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Pick your top 5!
                  </button>
                )}
                {race?.pick && !race?.raceResult && (
                  <button
                    onClick={() => onEditPick && onEditPick(race)}
                    type="button"
                    className="inline-flex justify-center mr-2 w-full items-center rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Edit your Pick
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
