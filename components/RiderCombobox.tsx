import { Combobox } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Rider } from '../lib/types';
import { classNames } from '../utils/utils';

type Props = {
  riders: Rider[];
  selectedRider: Rider | null;
  setSelectedRider: Dispatch<SetStateAction<null | Rider>>;
  label: string;
};

const RiderCombobox: FC<Props> = ({ riders, selectedRider, setSelectedRider, label }) => {
  const [query, setQuery] = useState('');

  const filteredRider =
    query === ''
      ? riders
      : riders.filter((rider) => {
          const lowerQuery = query.toLowerCase();
          return (
            rider.firstname.toLowerCase().includes(lowerQuery) ||
            rider.lastname.toLowerCase().includes(lowerQuery) ||
            rider.numberplate.toString().includes(lowerQuery)
          );
        });

  return (
    <Combobox as="div" value={selectedRider} onChange={setSelectedRider}>
      <div className="flex justify-between">
        <Combobox.Label className="block text-sm font-medium text-gray-700">{label}</Combobox.Label>
        {selectedRider && (
          <div
            tabIndex={0}
            onClick={() => setSelectedRider(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setSelectedRider(null);
              }
            }}
            className="mr-1 block text-sm font-medium rounded text-red-600 cursor-pointer hover:text-red-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear
          </div>
        )}
      </div>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(rider: Rider) => rider && `${rider?.numberplate} ${rider?.firstname} ${rider?.lastname}`}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2">
          <ChevronDownIcon
            tabIndex={0}
            className="h-5 w-5 text-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredRider.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredRider.map((rider) => (
              <Combobox.Option
                key={rider.id}
                value={rider}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-8 pr-4',
                    active ? 'bg-gray-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span className={classNames('block truncate', selected ? 'font-semibold' : 'font-normal')}>
                      <div className="flex">
                        <div className="w-16">{rider?.numberplate}</div>
                        <div>{`${rider?.firstname} ${rider?.lastname}`}</div>
                      </div>
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 left-0 flex items-center pl-1.5',
                          active ? 'text-white' : 'text-gray-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default RiderCombobox;
