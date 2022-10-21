export type User = {
  id: string;
  email: string;
  username: string;
  score: number;
  password: string;
  isAdmin: boolean;
};

export type Rider = {
  id: string;
  firstname: string;
  lastname: string;
  numberplate: number;
};
