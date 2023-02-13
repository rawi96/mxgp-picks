import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type ModalsContextType = {
  loginModalOpen: boolean;
  signUpModalOpen: boolean;
  setLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  setSignUpModalOpen: Dispatch<SetStateAction<boolean>>;
  sendResetPasswordMailModalOpen: boolean;
  setSendResetPasswordMailModalOpen: Dispatch<SetStateAction<boolean>>;
  notificationModalOpen: boolean;
  setNotificationModalOpen: Dispatch<SetStateAction<boolean>>;
  verifyAccountOpen: boolean;
  setVerifyAccountOpen: Dispatch<SetStateAction<boolean>>;
  notificationModalMessage: string;
  setNotificationModalMessage: Dispatch<SetStateAction<string>>;
  notificationType: 'Success' | 'Error';
  setNotificationType: Dispatch<SetStateAction<'Success' | 'Error'>>;
};

const modalsContextDefaultValues: ModalsContextType = {
  loginModalOpen: false,
  signUpModalOpen: false,
  setLoginModalOpen: () => null,
  setSignUpModalOpen: () => null,
  sendResetPasswordMailModalOpen: false,
  setSendResetPasswordMailModalOpen: () => null,
  notificationModalOpen: false,
  setNotificationModalOpen: () => null,
  verifyAccountOpen: false,
  setVerifyAccountOpen: () => null,
  notificationModalMessage: '',
  setNotificationModalMessage: () => null,
  notificationType: 'Success',
  setNotificationType: () => null,
};

export const ModalsContext = createContext<ModalsContextType>(modalsContextDefaultValues);

type Props = {
  children: ReactNode;
};

export function ModalsContextProvider({ children }: Props) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [sendResetPasswordMailModalOpen, setSendResetPasswordMailModalOpen] = useState(false);
  const [notificationModalOpen, setNotificationModalOpen] = useState(false);
  const [verifyAccountOpen, setVerifyAccountOpen] = useState(false);
  const [notificationModalMessage, setNotificationModalMessage] = useState('');
  const [notificationType, setNotificationType] = useState<'Success' | 'Error'>('Success');

  const value = {
    loginModalOpen,
    signUpModalOpen,
    setLoginModalOpen,
    setSignUpModalOpen,
    sendResetPasswordMailModalOpen,
    setSendResetPasswordMailModalOpen,
    notificationModalOpen,
    setNotificationModalOpen,
    verifyAccountOpen,
    setVerifyAccountOpen,
    notificationModalMessage,
    setNotificationModalMessage,
    notificationType,
    setNotificationType,
  };

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
}
