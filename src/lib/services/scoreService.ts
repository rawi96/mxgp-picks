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

    if (!session?.user.isAdmin || !session?.user.isVerified) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const races = await this.raceRepo.getAll();
    const users = await this.userRepo.getAll();
    const picks = await this.pickRepo.getAll();

    users.forEach(async (user) => {
      let scorePerRace: { [key: string]: { score: number; createdAt: Date } } = {};
      let score = 0;
      const userPicks = picks.filter((pick) => pick.userId === user.id);
      userPicks.forEach((pick) => {
        const pickedRace = races.find((race) => race.id === pick.raceId);
        const raceResultResult = pickedRace?.raceResult?.result;
        const userPickResult = pick.result;
        if (!raceResultResult || !userPickResult) {
          return;
        }
        const {
          first: firstResult,
          second: secondResult,
          third: thirdResult,
          fourth: fourthResult,
          fifth: fifthResult,
          wildcard: wildcardResult,
        } = raceResultResult;

        const {
          first: firstPick,
          second: secondPick,
          third: thirdPick,
          fourth: fourthPick,
          fifth: fifthPick,
          wildcard: wildcardPick,
        } = userPickResult;

        if (firstPick.id === firstResult.id) {
          const reward = 25 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };
          score += reward;
        } else if (
          firstPick.id === secondResult.id ||
          firstPick.id === thirdResult.id ||
          firstPick.id === fourthResult.id ||
          firstPick.id === fifthResult.id
        ) {
          const reward = 5 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };

          score += reward;
        } else {
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: scorePerRace[pickedRace.id]?.score || 0 + 0, createdAt: pick.createdAt },
          };
        }

        if (secondPick.id === secondResult.id) {
          const reward = 22 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };
          score += reward;
        } else if (
          secondPick.id === firstResult.id ||
          secondPick.id === thirdResult.id ||
          secondPick.id === fourthResult.id ||
          secondPick.id === fifthResult.id
        ) {
          const reward = 5 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };

          score += reward;
        } else {
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: scorePerRace[pickedRace.id]?.score || 0 + 0, createdAt: pick.createdAt },
          };
        }
        if (thirdPick.id === thirdResult.id) {
          const reward = 20 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };
          score += reward;
        } else if (
          thirdPick.id === firstResult.id ||
          thirdPick.id === secondResult.id ||
          thirdPick.id === fourthResult.id ||
          thirdPick.id === fifthResult.id
        ) {
          const reward = 5 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };
          score += reward;
        } else {
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: scorePerRace[pickedRace.id]?.score || 0 + 0, createdAt: pick.createdAt },
          };
        }
        if (fourthPick.id === fourthResult.id) {
          const reward = 18 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };
          score += reward;
        } else if (
          fourthPick.id === firstResult.id ||
          fourthPick.id === secondResult.id ||
          fourthPick.id === thirdResult.id ||
          fourthPick.id === fifthResult.id
        ) {
          const reward = 5 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };
          score += reward;
        } else {
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: scorePerRace[pickedRace.id]?.score || 0 + 0, createdAt: pick.createdAt },
          };
        }
        if (fifthPick.id === fifthResult.id) {
          const reward = 16 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };
          score += reward;
        } else if (
          fifthPick.id === firstResult.id ||
          fifthPick.id === secondResult.id ||
          fifthPick.id === thirdResult.id ||
          fifthPick.id === fourthResult.id
        ) {
          const reward = 5 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };
          score += reward;
        } else {
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: scorePerRace[pickedRace.id]?.score || 0 + 0, createdAt: pick.createdAt },
          };
        }
        if (wildcardPick.id === wildcardResult.id) {
          const reward = 25 * pickedRace.factor;
          scorePerRace = {
            ...scorePerRace,
            [pickedRace.id]: { score: (scorePerRace[pickedRace.id]?.score || 0) + reward, createdAt: pick.createdAt },
          };
          score += reward;
        }
      });
      await this.userRepo.update(user.id, { ...user, score, scorePerRace: JSON.stringify(scorePerRace) });
    });
    return res.status(200).json({ message: 'Score calculated' });
  }
}
