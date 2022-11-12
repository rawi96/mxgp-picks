import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import PickRepo from '../repos/pickRepo';
import RaceRepo from '../repos/raceRepo';
import RaceResultRepo from '../repos/raceResultRepo';
import ResultRepo from '../repos/resultRepo';
import { Race } from '../types/types';

export default class RaceService {
  private raceRepo: RaceRepo;
  private pickRepo: PickRepo;
  private raceResultRepo: RaceResultRepo;
  private resultRepo: ResultRepo;

  constructor(raceRepo: RaceRepo, pickRepo: PickRepo, raceResultRepo: RaceResultRepo, resultRepo: ResultRepo) {
    this.raceRepo = raceRepo;
    this.pickRepo = pickRepo;
    this.raceResultRepo = raceResultRepo;
    this.resultRepo = resultRepo;
  }

  private async mapPicksToRaces(races: any[], userId: string) {
    const picks = await this.pickRepo.getByUserId(userId);
    return races.map((race) => {
      const pickForRace = picks.find((pick) => race.id === pick.raceId);
      return { ...race, pick: pickForRace };
    });
  }

  public async addRace(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
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

    let createdRace;

    if (newRace.raceResult?.id && newRace.raceResult?.result && newRace.raceResult?.result.id) {
      createdRace = this.raceRepo.createNested(newRace);
    } else {
      createdRace = this.raceRepo.create(newRace);
    }

    return res.status(200).json(createdRace);
  }

  public async getRaces(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    let races = await this.raceRepo.getAll();

    if (session?.user.id) {
      races = await this.mapPicksToRaces(races, session.user.id);
    }

    return res.status(200).json(races);
  }

  public async updateRace(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    if (!session?.user.isAdmin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

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

    if (newRace.raceResult?.id && newRace.raceResult?.result && newRace.raceResult?.result.id) {
      const resultToCreateOrUpdate = newRace.raceResult.result;
      await this.resultRepo.createOrUpdate(resultToCreateOrUpdate);

      const raceResultToCreateOrUpdate = newRace.raceResult;
      await this.raceResultRepo.createOrUpdate(raceResultToCreateOrUpdate, newRace.id);
    }
    const updatedRace = await this.raceRepo.update(id, newRace);
    return res.status(200).json(updatedRace);
  }

  public async deleteRace(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    if (!session?.user.isAdmin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const id = req.query.id as string;

    if (!id) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const raceToDelete = await this.raceRepo.getById(id);
    const resultIdToDelete = raceToDelete?.raceResult?.result?.id;

    if (resultIdToDelete) {
      await this.resultRepo.delete(resultIdToDelete);
    }

    const picksToDelete = await this.pickRepo.getByRaceId(id);
    const pickIdsToDelete = picksToDelete.map((pick) => pick.id);

    const resultIdsToDelete: string[] = picksToDelete
      .map((pick) => pick.result?.id)
      .filter((id) => id !== undefined) as string[];

    await this.pickRepo.deleteMany(pickIdsToDelete);
    await this.resultRepo.deleteMany(resultIdsToDelete);
    const deletedRace = await this.raceRepo.delete(id);
    return res.status(200).json(deletedRace);
  }
}
