import type { NextApiRequest, NextApiResponse } from 'next';
import PickRepo from '../../../lib/repos/pickRepo';
import RaceRepo from '../../../lib/repos/raceRepo';
import UserRepo from '../../../lib/repos/userRepo';
import ScoreService from '../../../lib/services/scoreService';
import prisma from '../../../lib/utils/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const scoreService = new ScoreService(new RaceRepo(prisma), new PickRepo(prisma), new UserRepo(prisma));

  try {
    if (method === 'POST') {
      return await scoreService.calculateScore(req, res);
    }

    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
