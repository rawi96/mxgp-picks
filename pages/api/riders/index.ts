import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../lib/prisma';
import { Rider } from '../../../lib/types';

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

  try {
    const newRider: Rider = {
      id: uuidv4(),
      firstname,
      lastname,
      numberplate: Number(numberplate),
    };

    const createdRider = await prisma.rider.create({
      data: newRider,
    });
    return res.status(200).json(createdRider);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getRiders = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const riders = await prisma.rider.findMany({
      orderBy: {
        numberplate: 'asc',
      },
    });
    return res.status(200).json(riders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
