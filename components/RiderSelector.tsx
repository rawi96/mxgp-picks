import { Dispatch, FC, SetStateAction } from 'react';
import { Rider } from '../lib/types';
import RiderCombobox from './RiderCombobox';

type Props = {
  serverSideRiders: Rider[];
  selectedFirst: Rider | null;
  selectedSecond: Rider | null;
  selectedThird: Rider | null;
  selectedForth: Rider | null;
  selectedFifth: Rider | null;
  selectedWildcard: Rider | null;
  setSelectedFirst: Dispatch<SetStateAction<Rider | null>>;
  setSelectedSecond: Dispatch<SetStateAction<Rider | null>>;
  setSelectedThird: Dispatch<SetStateAction<Rider | null>>;
  setSelectedForth: Dispatch<SetStateAction<Rider | null>>;
  setSelectedFifth: Dispatch<SetStateAction<Rider | null>>;
  setSelectedWildcard: Dispatch<SetStateAction<Rider | null>>;
};

const RiderSelector: FC<Props> = ({
  serverSideRiders,
  selectedFirst,
  selectedSecond,
  selectedThird,
  selectedForth,
  selectedFifth,
  selectedWildcard,
  setSelectedFirst,
  setSelectedSecond,
  setSelectedThird,
  setSelectedForth,
  setSelectedFifth,
  setSelectedWildcard,
}) => {
  const allRidersExceptSelected = serverSideRiders.filter(
    (rider) =>
      rider.id !== selectedFirst?.id &&
      rider.id !== selectedSecond?.id &&
      rider.id !== selectedThird?.id &&
      rider.id !== selectedForth?.id &&
      rider.id !== selectedFifth?.id &&
      rider.id !== selectedWildcard?.id
  );

  return (
    <>
      <RiderCombobox
        label="1st"
        riders={allRidersExceptSelected}
        selectedRider={selectedFirst}
        setSelectedRider={setSelectedFirst}
      />
      <RiderCombobox
        label="2nd"
        riders={allRidersExceptSelected}
        selectedRider={selectedSecond}
        setSelectedRider={setSelectedSecond}
      />
      <RiderCombobox
        label="3rd"
        riders={allRidersExceptSelected}
        selectedRider={selectedThird}
        setSelectedRider={setSelectedThird}
      />
      <RiderCombobox
        label="4th"
        riders={allRidersExceptSelected}
        selectedRider={selectedForth}
        setSelectedRider={setSelectedForth}
      />
      <RiderCombobox
        label="5th"
        riders={allRidersExceptSelected}
        selectedRider={selectedFifth}
        setSelectedRider={setSelectedFifth}
      />
      <RiderCombobox
        label="Wildcard"
        riders={allRidersExceptSelected}
        selectedRider={selectedWildcard}
        setSelectedRider={setSelectedWildcard}
      />
    </>
  );
};

export default RiderSelector;
