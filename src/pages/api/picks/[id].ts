import type { NextApiRequest, NextApiResponse } from 'next';
import PickRepo from '../../../lib/repos/pickRepo';
import UserRepo from '../../../lib/repos/userRepo';
import PickService from '../../../lib/services/pickService';
import prisma from '../../../lib/utils/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const pickService = new PickService(new PickRepo(prisma), new UserRepo(prisma));

  try {
    switch (method) {
      case 'PUT':
        return await pickService.updatePick(req, res);
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
