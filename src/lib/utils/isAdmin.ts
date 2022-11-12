import UserRepo from '../repos/userRepo';

export const isAdmin = async (email: string | undefined, userRepo: UserRepo) => {
  if (!email) {
    return false;
  }
  const user = await userRepo.getByEmail(email);
  return user ? user.isAdmin : false;
};
