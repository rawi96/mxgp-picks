import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

  try {
    const updatedRider = await prisma.rider.update({
      where: {
        id,
      },
      data: {
        firstname,
        lastname,
        numberplate: Number(numberplate),
      },
    });
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

  try {
    const deletedRider = await prisma.rider.delete({
      where: {
        id,
      },
    });
    return res.status(200).json(deletedRider);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
