import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import PickRepo from '../../../lib/repos/pickRepo';
import RaceRepo from '../../../lib/repos/raceRepo';
import RaceResultRepo from '../../../lib/repos/raceResultRepo';
import ResultRepo from '../../../lib/repos/resultRepo';
import { Race } from '../../../lib/types/types';
import prisma from '../../../lib/utils/prisma';

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
  const { title, date, factor, wildcardPos, raceResult } = req.body;

  if (!title || !date || !factor || !wildcardPos) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const newRace: Race = {
    id,
    title,
    date: new Date(date),
    factor: Number(factor),
    wildcardPos: Number(wildcardPos),
    raceResult,
  };

  const raceRepo = new RaceRepo(prisma);
  const resultRepo = new ResultRepo(prisma);
  const raceResultRepo = new RaceResultRepo(prisma);

  try {
    let updatedRace;
    if (newRace.raceResult?.id && newRace.raceResult?.result && newRace.raceResult?.result.id) {
      const resultToCreateOrUpdate = newRace.raceResult.result;
      await resultRepo.createOrUpdate(resultToCreateOrUpdate);

      const raceResultToCreateOrUpdate = newRace.raceResult;
      await raceResultRepo.createOrUpdate(raceResultToCreateOrUpdate, newRace.id);

      updatedRace = await raceRepo.update(id, newRace);
    } else {
      updatedRace = await raceRepo.update(id, newRace);
    }
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

  const raceRepo = new RaceRepo(prisma);
  const picksRepo = new PickRepo(prisma);
  const resultRepo = new ResultRepo(prisma);

  try {
    const raceToDelete = await raceRepo.getById(id);
    const resultIdToDelete = raceToDelete?.raceResult?.result?.id;

    if (resultIdToDelete) {
      await resultRepo.delete(resultIdToDelete);
    }

    const picksToDelete = await picksRepo.getByRaceId(id);
    const pickIdsToDelete = picksToDelete.map((pick) => pick.id);

    const resultIdsToDelete: string[] = picksToDelete
      .map((pick) => pick.result?.id)
      .filter((id) => id !== undefined) as string[];

    await picksRepo.deleteMany(pickIdsToDelete);
    await resultRepo.deleteMany(resultIdsToDelete);
    const deletedRace = await raceRepo.delete(id);
    return res.status(200).json(deletedRace);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default handler;
