import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import PickRepo from '../../../lib/repos/pickRepo';
import { Pick } from '../../../lib/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'PUT') {
    return await updatePick(req, res);
  }

  res.setHeader('Allow', ['PUT']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

const updatePick = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session?.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const id = req.query.id as string;

  const { raceId, result } = req.body;

  if (!raceId || !result || !id) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const newPick: Pick = {
    id,
    raceId,
    userId: session.user.id,
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
