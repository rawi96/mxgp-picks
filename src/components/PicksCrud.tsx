import { useSession } from 'next-auth/react';
import { Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import { ModalsContext } from '../context/modalsContext';
import { Pick, Race, Rider } from '../lib/types';
import { useShowNotification } from '../lib/utils/utils';
import Modal from './Modal';
import PickForm from './PickForm';
import RacesCarousel from './RacesCarousel';

type Props = {
  serverSideRaces: Race[];
  serverSideRiders: Rider[];
};

type UsePicks = {
  modalOpen: boolean;
  addPick: (pick: Pick) => void;
  editPick: (pick: Pick) => void;
  setModalOpen: (open: boolean) => void;
  selectedRace: Race | null;
  setSelectedRace: Dispatch<SetStateAction<Race | null>>;
  races: Race[];
};

const usePick = (serverSideRaces: Race[]): UsePicks => {
  const [races, setRaces] = useState<Race[]>(serverSideRaces);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRace, setSelectedRace] = useState<Race | null>(null);
  const { showNotification } = useShowNotification();

  const reloadRaces = async () => {
    const res = await fetch('/api/races', {
      method: 'GET',
      credentials: 'same-origin',
    });
    const data = await res.json();
    setRaces(data);
  };

  const addPick = async (pick: Pick) => {
    //add cookies to fetch
    const res = await fetch('/api/picks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(pick),
    });
    if (res.ok) {
      reloadRaces();
      setModalOpen(false);
      showNotification('Successfully added!', 'Success');
    } else {
      showNotification('Something went wrong', 'Error');
    }
  };

  const editPick = async (pick: Pick) => {
    const res = await fetch(`/api/picks/${pick.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pick),
    });
    if (res.ok) {
      reloadRaces();
      setModalOpen(false);
      showNotification('Successfully edited!', 'Success');
    } else {
      showNotification('Something went wrong', 'Error');
    }
  };

  return { races, addPick, editPick, modalOpen, setModalOpen, selectedRace, setSelectedRace };
};

const PicksCrud: FC<Props> = ({ serverSideRaces, serverSideRiders }) => {
  const { races, addPick, editPick, modalOpen, setModalOpen, selectedRace, setSelectedRace } = usePick(serverSideRaces);
  const session = useSession();
  const { setLoginModalOpen } = useContext(ModalsContext);

  return (
    <>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <PickForm
          prefilledPick={selectedRace?.pick || null}
          addPick={addPick}
          editPick={editPick}
          serverSideRiders={serverSideRiders}
          race={selectedRace}
        />
      </Modal>
      <RacesCarousel
        type="home"
        races={races}
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
