import { PlusIcon } from '@heroicons/react/24/outline';
import { FC, useState } from 'react';
import { Rider } from '../lib/types';
import Modal from './Modal';
import RiderForm from './RiderForm';
import RiderTable from './RidersTable';

type Props = {
  serverSideRiders: Rider[];
};

type UseRiders = {
  riders: Rider[];
  onEditClick: (rider: Rider) => void;
  onAddClick: () => void;
  addRider: (rider: Rider) => void;
  editRider: (id: string, rider: Rider) => void;
  deleteRider: (id: string) => void;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  selectedRider: Rider | null;
};

const useRiders = (serverSideRiders: Rider[]): UseRiders => {
  const [riders, setRiders] = useState<Rider[]>(serverSideRiders);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

  const reloadRiders = async () => {
    const res = await fetch('/api/riders');
    const data = await res.json();
    setRiders(data);
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
    await fetch('/api/riders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rider),
    });
    reloadRiders();
    setModalOpen(false);
  };

  const editRider = async (id: string, rider: Rider) => {
    await fetch(`/api/riders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rider),
    });
    reloadRiders();
    setModalOpen(false);
  };

  const deleteRider = async (id: string) => {
    await fetch(`/api/riders/${id}`, {
      method: 'DELETE',
    });
    reloadRiders();
  };

  return {
    riders,
    onAddClick,
    onEditClick,
    addRider,
    editRider,
    deleteRider,
    modalOpen,
    setModalOpen,
    selectedRider,
  };
};

const RidersCrud: FC<Props> = ({ serverSideRiders }) => {
  const { riders, addRider, editRider, deleteRider, modalOpen, setModalOpen, selectedRider, onEditClick, onAddClick } =
    useRiders(serverSideRiders);

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <RiderForm prefilledRider={selectedRider} addRider={addRider} editRider={editRider} />
      </Modal>
      <RiderTable riders={riders} onEdit={onEditClick} onDelete={deleteRider} />
      <div className="flex justify-center mt-10">
        <button
          onClick={onAddClick}
          type="button"
          className="inline-flex items-center rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
          Add Rider
        </button>
      </div>
    </>
  );
};

export default RidersCrud;
