import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { FC } from 'react';
import { Race } from '../lib/types';
import { dateToString } from '../utils/utils';

type Props = {
  race: Race;
  index: number;
  onEdit: (race: Race) => void;
  onDelete: (id: string) => void;
  type: 'admin' | 'home';
};

const RaceCard: FC<Props> = ({ race, index, onEdit, onDelete, type }) => {
  return (
    <div className="flex justify-center">
      <div className="max-w-lg bg-white rounded-lg shadow-md mb-20">
        <div className="relative">
          <Image
            className="rounded-t-lg brightness-50"
            src={`/images/races/${index % 13}.png`}
            alt={race.title}
            width={500}
            height={300}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
            <p className="text-3xl font-bold">{race.title}</p>
            <p className="mt-3 text-xl">{dateToString(race.date)}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                        Position
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Rider
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Stats
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">1</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {race.raceResult?.result.first.firstname} {race.raceResult?.result.first.lastname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">TODO</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">2</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {race.raceResult?.result.second.firstname} {race.raceResult?.result.second.lastname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">TODO</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">3</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {race.raceResult?.result.third.firstname} {race.raceResult?.result.third.lastname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">TODO</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">4</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {race.raceResult?.result.forth.firstname} {race.raceResult?.result.forth.lastname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">TODO</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">5</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {race.raceResult?.result.fifth.firstname} {race.raceResult?.result.fifth.lastname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">TODO</td>
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        Wildcard ({race.wildcardPos})
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {race.raceResult?.result.wildcard.firstname} {race.raceResult?.result.wildcard.lastname}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">TODO</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {type === 'admin' ? (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => onEdit(race)}
                type="button"
                className="inline-flex justify-center mr-2 w-full items-center rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <PencilIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                Edit
              </button>
              <button
                onClick={() => onDelete(race.id)}
                type="button"
                className="inline-flex justify-center ml-2 w-full items-center rounded-md border border-transparent bg-red-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                <TrashIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                Delete
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
