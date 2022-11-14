import useSWR, { KeyedMutator } from 'swr';
import { Race } from '../lib/types/types';

export const useRaces = (): {
  races?: Race[];
  mutateRaces: KeyedMutator<any>;
  isLoadingRaces: boolean;
  isError: boolean;
} => {
  const { data, error, mutate } = useSWR(`/api/races`);

  return {
    races: data,
    mutateRaces: mutate,
    isLoadingRaces: !error && !data,
    isError: error,
  };
};
