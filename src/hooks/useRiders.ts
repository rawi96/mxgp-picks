import useSWR from 'swr';
import { Rider } from '../lib/types/types';

export const useRiders = (): {
  riders?: Rider[];
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR(`/api/riders`);

  return {
    riders: data,
    isLoading: !error && !data,
    isError: error,
  };
};
