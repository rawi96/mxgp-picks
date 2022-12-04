import { useContext } from 'react';
import { ModalsContext } from '../context/modalsContext';

export const useShowNotification = () => {
  const { setNotificationModalOpen, setNotificationModalMessage, setNotificationType } = useContext(ModalsContext);

  const showNotification = (message: string, type: 'Success' | 'Error') => {
    setNotificationModalMessage(message);
    setNotificationType(type);
    setNotificationModalOpen(true);
  };

  return { showNotification };
};
