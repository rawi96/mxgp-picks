import { FC, useContext } from 'react';
import { ModalsContext } from '../context/modalsContext';
import Login from './Login';
import Modal from './Modal';
import SignUp from './SignUp';

const SessionModals: FC = () => {
  const { loginModalOpen, setLoginModalOpen, setSignUpModalOpen, signUpModalOpen } = useContext(ModalsContext);

  return (
    <>
      <Modal open={loginModalOpen} setOpen={setLoginModalOpen}>
        <Login />
      </Modal>
      <Modal open={signUpModalOpen} setOpen={setSignUpModalOpen}>
        <SignUp />
      </Modal>
    </>
  );
};

export default SessionModals;
