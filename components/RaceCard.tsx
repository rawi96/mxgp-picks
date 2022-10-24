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
          <div className="flex justify-center mt-10">
            {type === 'admin' ? (
              <>
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
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
