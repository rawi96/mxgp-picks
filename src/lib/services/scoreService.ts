import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import PickRepo from '../repos/pickRepo';
import RaceRepo from '../repos/raceRepo';
import UserRepo from '../repos/userRepo';

export default class ScoreService {
  private raceRepo: RaceRepo;
  private pickRepo: PickRepo;
  private userRepo: UserRepo;

  constructor(raceRepo: RaceRepo, pickRepo: PickRepo, userRepo: UserRepo) {
    this.raceRepo = raceRepo;
    this.pickRepo = pickRepo;
    this.userRepo = userRepo;
  }

  public async calculateScore(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    if (!session?.user.isAdmin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const races = await this.raceRepo.getAll();
    const users = await this.userRepo.getAll();
    const picks = await this.pickRepo.getAll();

    users.forEach(async (user) => {
      let score = 0;
      const userPicks = picks.filter((pick) => pick.userId === user.id);
      userPicks.forEach((pick) => {
        const pickedRace = races.find((race) => race.id === pick.raceId);
        if (pickedRace.raceResult && pickedRace.raceResult.result && pick.result) {
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
        }
      });
      await this.userRepo.update(user.id, { ...user, score });
    });
    return res.status(200).json({ message: 'Score calculated' });
  }
}
