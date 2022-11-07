import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import PickRepo from '../../../lib/repos/pickRepo';
import RaceRepo from '../../../lib/repos/raceRepo';
import UserRepo from '../../../lib/repos/userRepo';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session?.user.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { method } = req;

  if (method === 'POST') {
    return await calculateScore(req, res);
  }

  res.setHeader('Allow', ['POST']);
  return res.status(405).end(`Method ${method} Not Allowed`);
};

const calculateScore = async (req: NextApiRequest, res: NextApiResponse) => {
  const userRepo = new UserRepo(prisma);
  const raceRepo = new RaceRepo(prisma);
  const pickRepo = new PickRepo(prisma);

  try {
    const races = await raceRepo.getAll();
    const users = await userRepo.getAll();
    const picks = await pickRepo.getAll();

    users.forEach(async (user) => {
      let score = 0;
      const userPicks = picks.filter((pick) => pick.userId === user.id);
      userPicks.forEach((pick) => {
        const pickedRace = races.find((race) => race.id === pick.raceId);
        if (pickedRace.raceResult.result.first.id === pick.result?.first.id) {
          score += 25;
        }
        if (pickedRace.raceResult.result.second.id === pick.result?.second.id) {
          score += 22;
        }
        if (pickedRace.raceResult.result.third.id === pick.result?.third.id) {
          score += 20;
        }
        if (pickedRace.raceResult.result.fourth.id === pick.result?.fourth.id) {
          score += 18;
        }
        if (pickedRace.raceResult.result.fifth.id === pick.result?.fifth.id) {
          score += 16;
        }
        if (pickedRace.raceResult.result.wildcard.id === pick.result?.wildcard.id) {
          score += 25;
        }
      });
      await userRepo.update(user.id, { ...user, score });
    });
    return res.status(200).json({ message: 'Score calculated' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export default handler;
