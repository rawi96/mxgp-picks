import useSWR from 'swr';
import { Race } from '../lib/types/types';

export const useRaces = (): {
  races?: Race[];
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR(`/api/races`);

  return {
    races: data,
    isLoading: !error && !data,
    isError: error,
  };
};
