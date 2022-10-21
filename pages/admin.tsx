import { PlusIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import AddRider from '../components/AddRider';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import RiderTable from '../components/RidersTable';
import { Rider } from '../lib/types';

const useAdminRoute = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== 'loading' && !session.data?.user?.isAdmin) {
      router.push('/');
    }
  }, [session]);

  return session;
};

type UseRidersType = {
  riders: Rider[] | [];
  addRider: (rider: Rider) => void;
  editRider: (id: string, rider: Rider) => void;
  deleteRider: (id: string) => void;
  addRiderOpen: boolean;
  setAddRiderOpen: (open: boolean) => void;
  selectedRider: Rider | null;
  setSelectedRider: (rider: Rider | null) => void;
};

const useRiders = (): UseRidersType => {
  const [addRiderOpen, setAddRiderOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

  const [riders, setRiders] = useState<Rider[] | []>([]);

  useEffect(() => {
    fetch('/api/riders')
      .then((res) => res.json())
      .then((data) => setRiders(data));
  }, [addRiderOpen]);

  const getRiders = () => {
    fetch('/api/riders')
      .then((res) => res.json())
      .then((data) => setRiders(data));
  };

  const addRider = (rider: Rider) => {
    fetch('/api/riders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rider),
    })
      .then((res) => res.json())
      .then((data) => getRiders());
    setAddRiderOpen(false);
  };

  const editRider = (id: string, rider: Rider) => {
    fetch(`/api/riders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rider),
    })
      .then((res) => res.json())
      .then((data) => getRiders());
    setAddRiderOpen(false);
  };

  const deleteRider = (id: string) => {
    fetch(`/api/riders/${id}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        getRiders();
      });
  };

  return { riders, addRider, editRider, deleteRider, addRiderOpen, setAddRiderOpen, selectedRider, setSelectedRider };
};

/*
Server-Side protection would be cleaner.
Unfortunately it doesn't work in the productive environment.
There you somehow ONLY get the email but not the isAdmin flag

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session?.user.isAdmin) {   <--- isAdmin doesn't exist ONLY in production mode
    return {
      props: { session },
    };
  }
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};
*/

const Admin: FC = () => {
  const { riders, addRider, editRider, deleteRider, addRiderOpen, setAddRiderOpen, selectedRider, setSelectedRider } =
    useRiders();
  const onEditClick = (id: string, rider: Rider) => {
    setSelectedRider(rider);
    setAddRiderOpen(true);
  };

  const session = useAdminRoute();

  return (
    <>
      {session.data?.user?.isAdmin ? (
        <Layout>
          <h1 className="text-xl font-semibold text-gray-900">Admin</h1>
          <button
            onClick={() => {
              setSelectedRider(null);
              setAddRiderOpen(true);
            }}
            type="button"
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
            Add Rider
          </button>
          <Modal open={addRiderOpen} setOpen={setAddRiderOpen}>
            <AddRider prefilledRider={selectedRider} addRider={addRider} editRider={editRider} />
          </Modal>
          <RiderTable riders={riders} onEdit={onEditClick} onDelete={deleteRider} />
        </Layout>
      ) : (
        <></>
      )}
      ;
    </>
  );
};

export default Admin;
