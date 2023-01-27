import { useSession } from 'next-auth/react';
import { FC, FormEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Pick, Race, Rider } from '../lib/types/types';
import RiderSelector from './RiderSelector';
import Spinner from './Spinner';

type Props = {
  addPick: (pick: Pick) => void;
  editPick: (pick: Pick) => void;
  prefilledPick: Pick | null;
  riders?: Rider[];
  race: Race | null;
  isLoading: boolean;
};

const PickForm: FC<Props> = ({ addPick, editPick, prefilledPick, riders, race, isLoading }) => {
  const [selectedFirst, setSelectedFirst] = useState<Rider | null>(prefilledPick?.result?.first || null);
  const [selectedSecond, setSelectedSecond] = useState<Rider | null>(prefilledPick?.result?.second || null);
  const [selectedThird, setSelectedThird] = useState<Rider | null>(prefilledPick?.result?.third || null);
  const [selectedFourth, setSelectedFourth] = useState<Rider | null>(prefilledPick?.result?.fourth || null);
  const [selectedFifth, setSelectedFifth] = useState<Rider | null>(prefilledPick?.result?.fifth || null);
  const [selectedWildcard, setSelectedWildcard] = useState<Rider | null>(prefilledPick?.result?.wildcard || null);
  const [isError, setIsError] = useState<boolean>(false);

  const session = useSession();
  const userId = session.data?.user.id;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !selectedFirst ||
      !selectedSecond ||
      !selectedThird ||
      !selectedFourth ||
      !selectedFifth ||
      !selectedWildcard ||
      !race ||
      !userId
    ) {
      setIsError(true);
      return;
    }
    setIsError(false);

    const pick: Pick = {
      id: prefilledPick?.id || uuidv4(),
      raceId: race.id,
      result: {
        id: prefilledPick?.result?.id || uuidv4(),
        first: selectedFirst,
        second: selectedSecond,
        third: selectedThird,
        fourth: selectedFourth,
        fifth: selectedFifth,
        wildcard: selectedWildcard,
      },
      createdAt: new Date(),
    };

    if (prefilledPick) {
      editPick(pick);
    } else {
      addPick(pick);
    }
  };

  return (
    <div className="flex min-h-full flex-col py-8 px-8">
      <h2 className="text-3xl font-bold tracking-tight text-red-700">Race</h2>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" onSubmit={(e) => onSubmit(e)}>
          <RiderSelector
            isError={isError}
            riders={riders}
            selectedFirst={selectedFirst}
            selectedSecond={selectedSecond}
            selectedThird={selectedThird}
            selectedFourth={selectedFourth}
            selectedFifth={selectedFifth}
            selectedWildcard={selectedWildcard}
            setSelectedFirst={setSelectedFirst}
            setSelectedSecond={setSelectedSecond}
            setSelectedThird={setSelectedThird}
            setSelectedFourth={setSelectedFourth}
            setSelectedFifth={setSelectedFifth}
            setSelectedWildcard={setSelectedWildcard}
            wildcardPosition={race?.wildcardPos}
          />
          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-red-700 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              {isLoading ? (
                <>
                  <Spinner />
                  ...Loading
                </>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PickForm;
