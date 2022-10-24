import { Carousel } from 'flowbite-react';
import { FC } from 'react';
import { Race } from '../lib/types';
import RaceCard from './RaceCard';

type Props = {
  races: Race[];
  onEdit: (race: Race) => void;
  onDelete: (id: string) => void;
  type: 'admin' | 'home';
};

const LeftArrow = () => (
  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 group-hover:bg-black/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10">
    <svg
      stroke="currentColor"
      fill="none"
      stroke-width="0"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-white sm:h-6 sm:w-6"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
    </svg>
  </span>
);

const RightArrow = () => (
  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/30 group-hover:bg-black/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10">
    <svg
      stroke="currentColor"
      fill="none"
      stroke-width="0"
      viewBox="0 0 24 24"
      className="h-5 w-5 text-white sm:h-6 sm:w-6"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
    </svg>
  </span>
);

const RacesCarousel: FC<Props> = ({ races, onEdit, onDelete, type }) => {
  return (
    <div className="flex justify-center">
      <Carousel slide={false} leftControl={<LeftArrow />} rightControl={<RightArrow />}>
        {races.map((race) => {
          return <RaceCard key={race.id} race={race} onEdit={onEdit} onDelete={onDelete} type={type} />;
        })}
      </Carousel>
    </div>
  );
};

export default RacesCarousel;
