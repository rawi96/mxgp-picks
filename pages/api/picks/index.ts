import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../lib/prisma';
import PickRepo from '../../../lib/repos/pickRepo';
import { Pick } from '../../../lib/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'GET') {
    return await getPicks(req, res);
  }

  if (method === 'POST') {
    return await addPick(req, res);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

const getPicks = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session?.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const pickRepo = new PickRepo(prisma);
  const picks = await pickRepo.getByUserId(session.user.id);
  return res.status(200).json(picks);
};

const addPick = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session?.user.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { raceId, result } = req.body;

  if (!raceId || !result) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const newPick: Pick = {
    id: uuidv4(),
    raceId,
    userId: session.user.id,
    result,
    resultId: result.id,
  };

  const pickRepo = new PickRepo(prisma);

  try {
    const createdPick = await pickRepo.create(newPick);

    return res.status(200).json(createdPick);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
export default handler;
