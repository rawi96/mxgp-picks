import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import PickRepo from '../../../lib/repos/pickRepo';
import RaceRepo from '../../../lib/repos/raceRepo';
import { Race } from '../../../lib/types/types';
import prisma from '../../../lib/utils/prisma';

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

  const raceRepo = new RaceRepo(prisma);

  try {
    let createdRace;

    if (newRace.raceResult?.id && newRace.raceResult?.result && newRace.raceResult?.result.id) {
      createdRace = raceRepo.createNested(newRace);
    } else {
      createdRace = raceRepo.create(newRace);
    }

    return res.status(200).json(createdRace);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getRaces = async (req: NextApiRequest, res: NextApiResponse) => {
  const raceRepo = new RaceRepo(prisma);

  const session = await getSession({ req });

  if (session?.user.id) {
    const pickRepo = new PickRepo(prisma);
    try {
      const picks = await pickRepo.getByUserId(session.user.id);
      const races = await raceRepo.getAll();
      const racesWithPicks = races.map((race) => {
        const pickForRace = picks.find((pick) => race.id === pick.raceId);
        return { ...race, pick: pickForRace };
      });
      return res.status(200).json(racesWithPicks);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  try {
    const races = await raceRepo.getAll();
    return res.status(200).json(races);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
