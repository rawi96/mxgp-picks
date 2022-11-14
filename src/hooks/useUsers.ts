import useSWR from 'swr';
import { User } from '../lib/types/types';

export const useUsers = (): {
  users?: User[];
  isLoadingUsers: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR(`/api/users`);

  return {
    users: data,
    isLoadingUsers: !error && !data,
    isError: error,
  };
};
