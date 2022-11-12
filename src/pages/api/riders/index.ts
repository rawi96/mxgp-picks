import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import RiderRepo from '../../../lib/repos/riderRepo';
import { Rider } from '../../../lib/types';
import prisma from '../../../lib/utils/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'POST') {
    return await addRider(req, res);
  }

  if (method === 'GET') {
    return await getRiders(req, res);
  }

  res.setHeader('Allow', ['POST', 'GET']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

const addRider = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session?.user.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { firstname, lastname, numberplate } = req.body;

  if (!firstname || !lastname || !numberplate) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const riderRepo = new RiderRepo(prisma);

  try {
    const newRider: Rider = {
      id: uuidv4(),
      firstname,
      lastname,
      numberplate: Number(numberplate),
    };

    const createdRider = await riderRepo.create(newRider);

    return res.status(200).json(createdRider);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getRiders = async (req: NextApiRequest, res: NextApiResponse) => {
  const riderRepo = new RiderRepo(prisma);
  try {
    const riders = await riderRepo.getAll();
    return res.status(200).json(riders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
