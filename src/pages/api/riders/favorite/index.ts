import type { NextApiRequest, NextApiResponse } from 'next';
import PickRepo from '../../../../lib/repos/pickRepo';
import RaceRepo from '../../../../lib/repos/raceRepo';
import RaceResultRepo from '../../../../lib/repos/raceResultRepo';
import ResultRepo from '../../../../lib/repos/resultRepo';
import RaceService from '../../../../lib/services/raceService';
import prisma from '../../../../lib/utils/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const raceService = new RaceService(
    new RaceRepo(prisma),
    new PickRepo(prisma),
    new RaceResultRepo(prisma),
    new ResultRepo(prisma)
  );

  try {
    if (method === 'GET') {
      return await raceService.getFavoriteRiderOfAllRaces(req, res);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
