import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import PickRepo from '../../../lib/repos/pickRepo';
import UserRepo from '../../../lib/repos/userRepo';
import { Pick } from '../../../lib/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  let userId;
  const session = await getSession({ req });
  const email = session?.user.email;
  if (email) {
    const userRepo = new UserRepo(prisma);
    const user = await userRepo.getByEmail(email);
    userId = user?.id;
  }
  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (method === 'PUT') {
    return await updatePick(userId, req, res);
  }

  res.setHeader('Allow', ['PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

const updatePick = async (userId: string, req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const { raceId, result } = req.body;

  if (!raceId || !result || !id) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const newPick: Pick = {
    id,
    raceId,
    userId,
    result,
    resultId: result.id,
  };

  const pickRepo = new PickRepo(prisma);

  try {
    const updatedPick = await pickRepo.update(newPick);

    return res.status(200).json(updatedPick);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
