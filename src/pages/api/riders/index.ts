import type { NextApiRequest, NextApiResponse } from 'next';
import RiderRepo from '../../../lib/repos/riderRepo';
import RiderService from '../../../lib/services/riderService';
import prisma from '../../../lib/utils/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const riderService = new RiderService(new RiderRepo(prisma));

  try {
    if (method === 'GET') {
      return await riderService.getRiders(req, res);
    }
    if (method === 'POST') {
      return await riderService.addRider(req, res);
    }
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
