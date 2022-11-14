import useSWR, { KeyedMutator } from 'swr';
import { User } from '../lib/types/types';

export const useUsers = (): {
  users?: User[];
  mutateUsers: KeyedMutator<any>;

  isLoadingUsers: boolean;
  isError: boolean;
} => {
  const { data, mutate, error } = useSWR(`/api/users`);

  return {
    users: data,
    mutateUsers: mutate,
    isLoadingUsers: !error && !data,
    isError: error,
  };
};
