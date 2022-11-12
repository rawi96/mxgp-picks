import type { NextApiRequest, NextApiResponse } from 'next';
import UserRepo from '../../../lib/repos/userRepo';
import prisma from '../../../lib/utils/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    return await getUsers(req, res);
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const userRepo = new UserRepo(prisma);
  try {
    const users = await userRepo.getAllWithPosition();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
