import useSWR, { KeyedMutator } from 'swr';
import { Race } from '../lib/types/types';

export const useRaces = (): {
  races?: Race[];
  mutateRaces: KeyedMutator<any>;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error, mutate } = useSWR(`/api/races`);

  return {
    races: data,
    mutateRaces: mutate,
    isLoading: !error && !data,
    isError: error,
  };
};
