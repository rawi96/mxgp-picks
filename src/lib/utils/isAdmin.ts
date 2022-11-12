import UserRepo from '../repos/userRepo';

export const isAdmin = async (email: string | undefined, userRepo: UserRepo) => {
  console.log(email);
  if (!email) {
    return false;
  }
  const user = await userRepo.getByEmail(email);
  console.log(user);
  console.log(user?.isAdmin);
  console.log(user ? user.isAdmin : false);
  return user ? user.isAdmin : false;
};
