import { Dispatch, FC, SetStateAction } from 'react';
import { Rider } from '../lib/types/types';
import RiderCombobox from './RiderCombobox';

type Props = {
  riders?: Rider[];
  selectedFirst: Rider | null;
  selectedSecond: Rider | null;
  selectedThird: Rider | null;
  selectedFourth: Rider | null;
  selectedFifth: Rider | null;
  selectedWildcard: Rider | null;
  setSelectedFirst: Dispatch<SetStateAction<Rider | null>>;
  setSelectedSecond: Dispatch<SetStateAction<Rider | null>>;
  setSelectedThird: Dispatch<SetStateAction<Rider | null>>;
  setSelectedFourth: Dispatch<SetStateAction<Rider | null>>;
  setSelectedFifth: Dispatch<SetStateAction<Rider | null>>;
  setSelectedWildcard: Dispatch<SetStateAction<Rider | null>>;
  isError: boolean;
};

const RiderSelector: FC<Props> = ({
  riders,
  selectedFirst,
  selectedSecond,
  selectedThird,
  selectedFourth,
  selectedFifth,
  selectedWildcard,
  setSelectedFirst,
  setSelectedSecond,
  setSelectedThird,
  setSelectedFourth,
  setSelectedFifth,
  setSelectedWildcard,
  isError,
}) => {
  const allRidersExceptSelected = riders?.filter(
    (rider) =>
      rider.id !== selectedFirst?.id &&
      rider.id !== selectedSecond?.id &&
      rider.id !== selectedThird?.id &&
      rider.id !== selectedFourth?.id &&
      rider.id !== selectedFifth?.id &&
      rider.id !== selectedWildcard?.id
  );

  return (
    <>
      <RiderCombobox
        isError={isError}
        label="1st"
        riders={allRidersExceptSelected}
        selectedRider={selectedFirst}
        setSelectedRider={setSelectedFirst}
      />
      <RiderCombobox
        isError={isError}
        label="2nd"
        riders={allRidersExceptSelected}
        selectedRider={selectedSecond}
        setSelectedRider={setSelectedSecond}
      />
      <RiderCombobox
        isError={isError}
        label="3rd"
        riders={allRidersExceptSelected}
        selectedRider={selectedThird}
        setSelectedRider={setSelectedThird}
      />
      <RiderCombobox
        isError={isError}
        label="4th"
        riders={allRidersExceptSelected}
        selectedRider={selectedFourth}
        setSelectedRider={setSelectedFourth}
      />
      <RiderCombobox
        isError={isError}
        label="5th"
        riders={allRidersExceptSelected}
        selectedRider={selectedFifth}
        setSelectedRider={setSelectedFifth}
      />
      <RiderCombobox
        isError={isError}
        label="Wildcard"
        riders={allRidersExceptSelected}
        selectedRider={selectedWildcard}
        setSelectedRider={setSelectedWildcard}
      />
    </>
  );
};

export default RiderSelector;
