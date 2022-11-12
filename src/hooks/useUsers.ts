import useSWR from 'swr';
import { User } from '../lib/types/types';

export const useUsers = (): {
  users?: User[];
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR(`/api/users`);

  return {
    users: data,
    isLoading: !error && !data,
    isError: error,
  };
};
