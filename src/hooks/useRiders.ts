import useSWR, { KeyedMutator } from 'swr';
import { Rider } from '../lib/types/types';

export const useRiders = (): {
  riders?: Rider[];
  mutateRiders: KeyedMutator<any>;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error, mutate } = useSWR(`/api/riders`);

  return {
    riders: data,
    mutateRiders: mutate,
    isLoading: !error && !data,
    isError: error,
  };
};
