import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import RiderRepo from '../repos/riderRepo';
import UserRepo from '../repos/userRepo';
import { Rider } from '../types/types';
import { isAdmin } from '../utils/isAdmin';

export default class RiderService {
  private riderRepo: RiderRepo;
  private userRepo: UserRepo;

  constructor(riderRepo: RiderRepo, userRepo: UserRepo) {
    this.riderRepo = riderRepo;
    this.userRepo = userRepo;
  }

  public async addRider(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    if (!(await isAdmin(session?.user.email, this.userRepo))) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { firstname, lastname, numberplate } = req.body;

    if (!firstname || !lastname || !numberplate) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const newRider: Rider = {
      id: uuidv4(),
      firstname,
      lastname,
      numberplate: Number(numberplate),
    };

    const createdRider = await this.riderRepo.create(newRider);

    return res.status(200).json(createdRider);
  }

  public async getRiders(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const riders = await this.riderRepo.getAll();
    return res.status(200).json(riders);
  }

  public async updateRider(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    if (!(await isAdmin(session?.user.email, this.userRepo))) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const id = req.query.id as string;
    const { firstname, lastname, numberplate } = req.body;

    if (!id || !firstname || !lastname || !numberplate) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const newRider: Rider = {
      id,
      firstname,
      lastname,
      numberplate: Number(numberplate),
    };

    const updatedRider = await this.riderRepo.update(id, newRider);
    return res.status(200).json(updatedRider);
  }

  public async deleteRider(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    if (!(await isAdmin(session?.user.email, this.userRepo))) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const id = req.query.id as string;

    if (!id) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const deletedRider = await this.riderRepo.delete(id);
    return res.status(200).json(deletedRider);
  }
}
