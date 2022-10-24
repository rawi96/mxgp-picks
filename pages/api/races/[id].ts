import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session?.user.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { method } = req;

  if (method === 'PUT') {
    return await updateRace(req, res);
  }

  if (method === 'DELETE') {
    return await deleteRace(req, res);
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

const updateRace = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;
  const { title, date, factor, wildcardPos } = req.body;

  if (!title || !date || !factor || !wildcardPos) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const updatedRace = await prisma.race.update({
      where: {
        id,
      },
      data: {
        title,
        date: new Date(date),
        factor: Number(factor),
        wildcardPos: Number(wildcardPos),
      },
    });
    return res.status(200).json(updatedRace);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRace = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    const deletedRace = await prisma.race.delete({
      where: {
        id,
      },
    });
    return res.status(200).json(deletedRace);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
