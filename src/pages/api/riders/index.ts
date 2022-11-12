import type { NextApiRequest, NextApiResponse } from 'next';
import RiderRepo from '../../../lib/repos/riderRepo';
import UserRepo from '../../../lib/repos/userRepo';
import RiderService from '../../../lib/services/riderService';
import prisma from '../../../lib/utils/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const riderService = new RiderService(new RiderRepo(prisma), new UserRepo(prisma));

  try {
    switch (method) {
      case 'GET':
        return await riderService.getRiders(req, res);
      case 'POST':
        return await riderService.addRider(req, res);
      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
