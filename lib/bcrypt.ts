const bcrypt = require('bcrypt');

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(6);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  const isEqual = await bcrypt.compare(password, hashedPassword);
  return isEqual;
};
