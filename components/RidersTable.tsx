import { FC } from 'react';
import { Rider } from '../lib/types';

type Props = {
  riders: Rider[];
  onEdit: (id: string, rider: Rider) => void;
  onDelete: (id: string) => void;
};

const RiderTable: FC<Props> = ({ riders, onEdit, onDelete }) => {
  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Numberplate
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Fullname
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {riders.map((rider) => (
                  <tr key={rider.id}>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">{rider.numberplate}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {rider.firstname} {rider.lastname}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div
                        onClick={() => onEdit(rider.id, rider)}
                        className="text-gray-500 cursor-pointer hover:text-gray-800"
                      >
                        Edit
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div onClick={() => onDelete(rider.id)} className="text-red-600 cursor-pointer hover:text-red-900">
                        Delete
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderTable;
