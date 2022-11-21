import { useSession } from 'next-auth/react';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { KeyedMutator } from 'swr';
import { ModalsContext } from '../context/modalsContext';
import { Pick, Race, Rider } from '../lib/types/types';
import { useShowNotification } from '../lib/utils/utils';
import Modal from './Modal';
import PickForm from './PickForm';
import RacesCarousel from './RacesCarousel';

type Props = {
  races?: Race[];
  riders?: Rider[];
  mutateRaces: KeyedMutator<any>;
  isLoadingRaces?: boolean;
};

type UsePicks = {
  modalOpen: boolean;
  addPick: (pick: Pick) => void;
  editPick: (pick: Pick) => void;
  setModalOpen: (open: boolean) => void;
  selectedRace: Race | null;
  setSelectedRace: Dispatch<SetStateAction<Race | null>>;
  isLoading: boolean;
};

const usePick = (mutateRaces: KeyedMutator<any>): UsePicks => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useShowNotification();

  const reloadRaces = async () => {
    await mutateRaces();
  };

  const addPick = async (pick: Pick) => {
    setIsLoading(true);
    const res = await fetch('/api/picks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(pick),
    });
    if (res.ok) {
      await reloadRaces();
      setModalOpen(false);
      showNotification('Successfully added!', 'Success');
      setIsLoading(false);
    } else {
      showNotification('Something went wrong', 'Error');
      setIsLoading(false);
    }
  };

  const editPick = async (pick: Pick) => {
    setIsLoading(true);
    const res = await fetch(`/api/picks/${pick.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pick),
    });
    if (res.ok) {
      await reloadRaces();
      setModalOpen(false);
      showNotification('Successfully edited!', 'Success');
      setIsLoading(false);
    } else {
      showNotification('Something went wrong', 'Error');
      setIsLoading(false);
    }
  };

  return { addPick, editPick, modalOpen, setModalOpen, selectedRace, setSelectedRace, isLoading };
};

const PicksCrud: FC<Props> = ({ races, riders, mutateRaces, isLoadingRaces }) => {
  const { addPick, editPick, modalOpen, setModalOpen, selectedRace, setSelectedRace, isLoading } = usePick(mutateRaces);
  const session = useSession();
  const { setLoginModalOpen } = useContext(ModalsContext);

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <PickForm
          prefilledPick={selectedRace?.pick || null}
          addPick={addPick}
          editPick={editPick}
          riders={riders}
          race={selectedRace}
          isLoading={isLoading}
        />
      </Modal>
      <RacesCarousel
        type="home"
        races={races}
        isLoadingRaces={isLoadingRaces}
        isLoading={isLoading}
        onPick={(race) => {
          setSelectedRace(race);
          if (session.data?.user.id) {
            setModalOpen(true);
          } else {
            setLoginModalOpen(true);
          }
        }}
        onEditPick={(race) => {
          setSelectedRace(race);
          if (session.data?.user.id) {
            setModalOpen(true);
          } else {
            setLoginModalOpen(true);
          }
        }}
      />
    </>
  );
};

export default PicksCrud;
