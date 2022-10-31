export type User = {
  id: string;
  email: string;
  username: string;
  score: number;
  password: string;
  isAdmin: boolean;
  position?: number;
};

export type Rider = {
  id: string;
  firstname: string;
  lastname: string;
  numberplate: number;
};

export type Race = {
  id: string;
  title: string;
  date: Date;
  factor: number;
  wildcardPos: number;
  raceResult?: RaceResult;
};

export type Result = {
  id: string;
  first: Rider;
  second: Rider;
  third: Rider;
  forth: Rider;
  fifth: Rider;
  wildcard: Rider;
};

export type RaceResult = {
  id: string;
  result: Result;
};
