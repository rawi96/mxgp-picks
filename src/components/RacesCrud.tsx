import { PlusIcon } from '@heroicons/react/24/outline';
import { FC, useState } from 'react';
import { KeyedMutator } from 'swr';
import { Race, Rider } from '../lib/types/types';
import { useShowNotification } from '../lib/utils/utils';
import Modal from './Modal';
import RaceForm from './RaceForm';
import RacesCarousel from './RacesCarousel';

type Props = {
  races?: Race[];
  riders?: Rider[];
  mutateRaces: KeyedMutator<any>;
  isLoadingRaces?: boolean;
};

type UseRaces = {
  onEditClick: (race: Race) => void;
  onAddClick: () => void;
  addRace: (race: Race) => void;
  editRace: (id: string, race: Race) => void;
  deleteRace: (id: string) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  selectedRace: Race | null;
  isLoading: boolean;
};

const useRaces = (mutateRaces: KeyedMutator<any>): UseRaces => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useShowNotification();

  const reloadRaces = async () => {
    await mutateRaces();
  };

  const onAddClick = () => {
    setSelectedRace(null);
    setModalOpen(true);
  };

  const onEditClick = (race: Race) => {
    setSelectedRace(race);
    setModalOpen(true);
  };

  const addRace = async (race: Race) => {
    setIsLoading(true);
    const res = await fetch('/api/races', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(race),
    });
    if (res.ok) {
      setModalOpen(false);
      showNotification('Successfully added!', 'Success');
      reloadRaces();
      setIsLoading(false);
    } else {
      showNotification('Something went wrong', 'Error');
      setIsLoading(false);
    }
  };

  const editRace = async (id: string, race: Race) => {
    setIsLoading(true);
    const res = await fetch(`/api/races/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(race),
    });
    if (res.ok) {
      reloadRaces();
      setModalOpen(false);
      showNotification('Successfully updated!', 'Success');
      reloadRaces();
      setIsLoading(false);
    } else {
      showNotification('Something went wrong', 'Error');
      setIsLoading(false);
    }
  };

  const deleteRace = async (id: string) => {
    setIsLoading(true);

    const res = await fetch(`/api/races/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      reloadRaces();
      setModalOpen(false);
      showNotification('Successfully deleted!', 'Success');
      reloadRaces();
      setIsLoading(false);
    } else {
      showNotification('Something went wrong!', 'Error');
      setIsLoading(false);
    }
  };

  return {
    onAddClick,
    onEditClick,
    addRace,
    editRace,
    deleteRace,
    modalOpen,
    setModalOpen,
    selectedRace,
    isLoading,
  };
};

const RacesCrud: FC<Props> = ({ races, riders, mutateRaces, isLoadingRaces }) => {
  const { addRace, editRace, deleteRace, modalOpen, setModalOpen, selectedRace, onEditClick, onAddClick, isLoading } =
    useRaces(mutateRaces);

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <RaceForm prefilledRace={selectedRace} addRace={addRace} editRace={editRace} riders={riders} isLoading={isLoading} />
      </Modal>
      <RacesCarousel
        type="admin"
        races={races}
        onEdit={onEditClick}
        onDelete={deleteRace}
        isLoadingRaces={isLoadingRaces}
        isLoading={isLoading}
      />
      <div className="flex justify-center mt-10">
        <button
          onClick={onAddClick}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Add Race
        </button>
      </div>
    </>
  );
};

export default RacesCrud;
