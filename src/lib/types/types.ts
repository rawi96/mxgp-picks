export type User = {
  id: string;
  email: string;
  username: string;
  score: number;
  scorePerRace: string | null;
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
  pick?: Pick;
};

export type Result = {
  id: string;
  first: Rider;
  firstId?: string;
  second: Rider;
  secondId?: string;
  third: Rider;
  thirdId?: string;
  fourth: Rider;
  fourthId?: string;
  fifth: Rider;
  fifthId?: string;
  wildcard: Rider;
  wildcardId?: string;
};

export type RaceResult = {
  id: string;
  result: Result;
};

export type Pick = {
  id: string;
  userId?: string;
  raceId?: string;
  resultId?: string;
  result?: Result;
};
