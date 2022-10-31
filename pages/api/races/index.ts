import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../lib/prisma';
import { Race } from '../../../lib/types';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method === 'POST') {
    return await addRace(req, res);
  }

  if (method === 'GET') {
    return await getRaces(req, res);
  }

  res.setHeader('Allow', ['POST', 'GET']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

const addRace = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session?.user.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { title, date, factor, wildcardPos, raceResult } = req.body;

  if (!title || !date || !factor || !wildcardPos) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const newRace: Race = {
    id: uuidv4(),
    title,
    date: new Date(date),
    factor: Number(factor),
    wildcardPos: Number(wildcardPos),
    raceResult,
  };

  try {
    let createdRace;
    if (newRace.raceResult?.id && newRace.raceResult?.result && newRace.raceResult?.result.id) {
      createdRace = await prisma.race.create({
        data: {
          ...newRace,
          raceResult: {
            create: {
              id: newRace.raceResult?.id,
              result: {
                create: {
                  id: newRace.raceResult?.result.id,
                  first: {
                    connect: {
                      id: newRace.raceResult?.result.first.id,
                    },
                  },
                  second: {
                    connect: {
                      id: newRace.raceResult?.result.second.id,
                    },
                  },
                  third: {
                    connect: {
                      id: newRace.raceResult?.result.third.id,
                    },
                  },
                  forth: {
                    connect: {
                      id: newRace.raceResult?.result.forth.id,
                    },
                  },
                  fifth: {
                    connect: {
                      id: newRace.raceResult?.result.fifth.id,
                    },
                  },
                  wildcard: {
                    connect: {
                      id: newRace.raceResult?.result.wildcard.id,
                    },
                  },
                },
              },
            },
          },
        },
        include: {
          raceResult: {
            include: {
              result: {
                include: {
                  first: true,
                  second: true,
                  third: true,
                  forth: true,
                  fifth: true,
                  wildcard: true,
                },
              },
            },
          },
        },
      });
    } else {
      createdRace = await prisma.race.create({
        data: newRace,
      });
    }
    return res.status(200).json(createdRace);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getRaces = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const races = await prisma.race.findMany({
      include: {
        raceResult: {
          include: {
            result: {
              include: {
                first: true,
                second: true,
                third: true,
                forth: true,
                fifth: true,
                wildcard: true,
              },
            },
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
    return res.status(200).json(races);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
