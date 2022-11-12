import useSWR from 'swr';
import { Pick } from '../lib/types/types';

export const usePicks = (): {
  picks?: Pick[];
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR(`/api/picks`);

  return {
    picks: data,
    isLoading: !error && !data,
    isError: error,
  };
};
