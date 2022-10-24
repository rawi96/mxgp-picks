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
};
