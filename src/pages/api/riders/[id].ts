import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import RiderRepo from '../../../lib/repos/riderRepo';
import { Rider } from '../../../lib/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session?.user.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { method } = req;

  if (method === 'PUT') {
    return await updateRider(req, res);
  }

  if (method === 'DELETE') {
    return await deleteRider(req, res);
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

const updateRider = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const { firstname, lastname, numberplate } = req.body;

  if (!id || !firstname || !lastname || !numberplate) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const newRider: Rider = {
    id,
    firstname,
    lastname,
    numberplate: Number(numberplate),
  };

  const riderRepo = new RiderRepo(prisma);

  try {
    const updatedRider = await riderRepo.update(id, newRider);
    return res.status(200).json(updatedRider);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRider = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const riderRepo = new RiderRepo(prisma);

  try {
    const deletedRider = await riderRepo.delete(id);
    return res.status(200).json(deletedRider);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
