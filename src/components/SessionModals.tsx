import { FC, useContext } from 'react';
import { ModalsContext } from '../context/modalsContext';
import Login from './Login';
import Modal from './Modal';
import SignUp from './SignUp';
import VerifyAccountMessage from './VerifyAccountMessage';

const SessionModals: FC = () => {
  const { loginModalOpen, setLoginModalOpen, setSignUpModalOpen, signUpModalOpen, verifyAccountOpen, setVerifyAccountOpen } =
    useContext(ModalsContext);

  return (
    <>
      <Modal open={loginModalOpen} setOpen={setLoginModalOpen}>
        <Login />
      </Modal>
      <Modal open={signUpModalOpen} setOpen={setSignUpModalOpen}>
        <SignUp />
      </Modal>
      <Modal open={verifyAccountOpen} setOpen={setVerifyAccountOpen}>
        <VerifyAccountMessage />
      </Modal>
    </>
  );
};

export default SessionModals;
