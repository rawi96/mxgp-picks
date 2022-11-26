import useSWR from 'swr';
import { Rider } from '../lib/types/types';

export const useFavoriteRider = (): {
  favoriteRider?: Rider;
  isLoadingFavoriteRider: boolean;
  isError: boolean;
} => {
  const { data, error } = useSWR(`/api/riders/favorite`);

  return {
    favoriteRider: data,
    isLoadingFavoriteRider: !error && !data,
    isError: error,
  };
};
