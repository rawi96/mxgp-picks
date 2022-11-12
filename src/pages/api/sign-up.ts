import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../lib/prisma';
import UserRepo from '../../lib/repos/userRepo';
import { User } from '../../lib/types';
import { hashPassword } from '../../lib/utils/bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../../lib/utils/utils';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, username, password } = req.body;
  const { method } = req;

  if (method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  }

  if (!email || !username || !password) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  if (!REGEX_EMAIL.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  if (!REGEX_PASSWORD.test(password)) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const userRepo = new UserRepo(prisma);

  const emailExists = await userRepo.getByEmail(email);

  if (emailExists) {
    return res.status(400).json({ message: 'Email already exists!' });
  }

  const usernameExists = await userRepo.getByUsername(username);

  if (usernameExists) {
    return res.status(400).json({ message: 'Username already exists!' });
  }

  try {
    const newUser: User = {
      id: uuidv4(),
      email,
      username,
      password: await hashPassword(password),
      isAdmin: false,
      score: 0,
    };

    const createdUser = await userRepo.create(newUser);
    return res.status(200).json(createdUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
