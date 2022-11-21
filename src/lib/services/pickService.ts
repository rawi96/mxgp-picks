import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import PickRepo from '../repos/pickRepo';
import { Pick } from '../types/types';

export default class PickService {
  private pickRepo: PickRepo;

  constructor(pickRepo: PickRepo) {
    this.pickRepo = pickRepo;
  }

  public async addPick(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    if (!session?.user || !session?.user.isVerified) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { raceId, result } = req.body;

    if (!raceId || !result) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const newPick: Pick = {
      id: uuidv4(),
      raceId,
      userId: session.user.id,
      result,
      resultId: result.id,
      createdAt: new Date(),
    };

    const createdPick = await this.pickRepo.create(newPick);

    return res.status(200).json(createdPick);
  }

  public async getPicks(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    if (!session?.user || !session?.user.isVerified) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const picks = await this.pickRepo.getByUserId(session.user.id);
    return res.status(200).json(picks);
  }

  public async updatePick(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    if (!session?.user || !session?.user.isVerified) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const id = req.query.id as string;
    const { raceId, result } = req.body;

    if (!raceId || !result || !id) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const newPick: Pick = {
      id,
      raceId,
      userId: session.user.id,
      result,
      resultId: result.id,
      createdAt: new Date(),
    };

    const updatedPick = await this.pickRepo.update(newPick);
    return res.status(200).json(updatedPick);
  }
}
