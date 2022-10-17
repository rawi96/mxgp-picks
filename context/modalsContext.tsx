import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type ModalsContextType = {
  loginModalOpen: boolean;
  signUpModalOpen: boolean;
  setLoginModalOpen: Dispatch<SetStateAction<boolean>>;
  setSignUpModalOpen: Dispatch<SetStateAction<boolean>>;
};

const modalsContextDefaultValues: ModalsContextType = {
  loginModalOpen: false,
  signUpModalOpen: false,
  setLoginModalOpen: () => null,
  setSignUpModalOpen: () => null,
};

export const ModalsContext = createContext<ModalsContextType>(modalsContextDefaultValues);

type Props = {
  children: ReactNode;
};

export function ModalsContextProvider({ children }: Props) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const value = {
    loginModalOpen,
    signUpModalOpen,
    setLoginModalOpen,
    setSignUpModalOpen,
  };

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
}
