import { PlusIcon } from '@heroicons/react/24/outline';
import { FC, useState } from 'react';
import { KeyedMutator } from 'swr';
import { Rider } from '../lib/types/types';
import { useShowNotification } from '../lib/utils/utils';
import Modal from './Modal';
import RiderForm from './RiderForm';
import RiderTable from './RidersTable';
import Spinner from './Spinner';

type Props = {
  riders?: Rider[];
  mutateRiders: KeyedMutator<any>;
};

type UseRiders = {
  onEditClick: (rider: Rider) => void;
  onAddClick: () => void;
  addRider: (rider: Rider) => void;
  editRider: (id: string, rider: Rider) => void;
  deleteRider: (id: string) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  selectedRider: Rider | null;
  isLoading: boolean;
};

const useRiders = (mutateRiders: KeyedMutator<any>): UseRiders => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const { showNotification } = useShowNotification();
  const [isLoading, setIsLoading] = useState(false);

  const reloadRiders = async () => {
    await mutateRiders();
  };

  const onAddClick = () => {
    setSelectedRider(null);
    setModalOpen(true);
  };

  const onEditClick = (rider: Rider) => {
    setSelectedRider(rider);
    setModalOpen(true);
  };

  const addRider = async (rider: Rider) => {
    setIsLoading(true);
    const res = await fetch('/api/riders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(rider),
    });
    if (res.ok) {
      reloadRiders();
      setModalOpen(false);
      showNotification('Successfully added!', 'Success');
      setModalOpen(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      showNotification('Something went wrong!', 'Error');
    }
  };

  const editRider = async (id: string, rider: Rider) => {
    setIsLoading(true);
    const res = await fetch(`/api/riders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rider),
    });
    if (res.ok) {
      reloadRiders();
      setIsLoading(false);
      showNotification('Successfully updated!', 'Success');
      setModalOpen(false);
    } else {
      showNotification('Something went wrong!', 'Error');
    }
  };

  const deleteRider = async (id: string) => {
    setIsLoading(true);
    const res = await fetch(`/api/riders/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      showNotification('Successfully deleted!', 'Success');
      reloadRiders();
      setIsLoading(false);
    } else {
      showNotification('Rider is already used in a result!', 'Error');
      setIsLoading(false);
    }
  };

  return {
    onAddClick,
    onEditClick,
    addRider,
    editRider,
    deleteRider,
    modalOpen,
    setModalOpen,
    selectedRider,
    isLoading,
  };
};

const RidersCrud: FC<Props> = ({ riders, mutateRiders }) => {
  const { addRider, editRider, deleteRider, modalOpen, setModalOpen, selectedRider, onEditClick, onAddClick, isLoading } =
    useRiders(mutateRiders);

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <RiderForm prefilledRider={selectedRider} addRider={addRider} editRider={editRider} isLoading={isLoading} />
      </Modal>
      <RiderTable riders={riders} onEdit={onEditClick} onDelete={deleteRider} isLoading={isLoading} />
      <div className="flex justify-center mt-10">
        <button
          disabled={isLoading}
          onClick={onAddClick}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {isLoading ? (
            <>
              <Spinner />
              ...Loading
            </>
          ) : (
            <>
              <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
              Add Rider
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default RidersCrud;
