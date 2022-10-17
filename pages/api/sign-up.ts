import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { hashPassword } from '../../lib/bcrypt';
import { User } from '../../lib/types';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../../utils/utils';

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

  const emailExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (emailExists) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const usernameExists = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (usernameExists) {
    return res.status(400).json({ message: 'Username already exists' });
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

    const createdUser = await prisma.user.create({
      data: newUser,
    });
    res.status(200).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
