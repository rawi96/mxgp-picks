import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import RaceRepo from '../repos/raceRepo';
import { default as UserRepo } from '../repos/userRepo';
import { User } from '../types/types';
import { comparePasswords, hashPassword } from '../utils/bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../utils/utils';

export default class UserService {
  private userRepo: UserRepo;
  private raceRepo: RaceRepo;

  constructor(userRepo: UserRepo, raceRepo: RaceRepo) {
    this.userRepo = userRepo;
    this.raceRepo = raceRepo;
  }

  public async addUser(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    if (!REGEX_EMAIL.test(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (!REGEX_PASSWORD.test(password)) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const emailExists = await this.userRepo.getByEmail(email);

    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists!' });
    }

    const usernameExists = await this.userRepo.getByUsername(username);

    if (usernameExists) {
      return res.status(400).json({ message: 'Username already exists!' });
    }

    const newUser: User = {
      id: uuidv4(),
      email,
      username,
      password: await hashPassword(password),
      isAdmin: false,
      score: 0,
      scorePerRace: null,
    };

    const createdUser = await this.userRepo.create(newUser);
    return res.status(200).json(createdUser);
  }

  public async getUsers(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const users = await this.userRepo.getAllWithPosition();
    return res.status(200).json(users);
  }

  public async authorize(email: string, password: string): Promise<User | null> {
    const user = await this.userRepo.getByEmail(email);
    if (user && (await comparePasswords(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }

  public async createCustomSession(session: any) {
    const user = await this.userRepo.getByEmail(session.user.email);
    return {
      ...session,
      user: {
        ...session.user,
        id: user?.id,
        username: user?.username,
        isAdmin: user?.isAdmin,
      },
    };
  }

  public async getAllWithPosition() {
    return this.userRepo.getAllWithPosition();
  }

  public async getAllWithPositionPerRace(raceId: string): Promise<User[]> {
    let users = await this.userRepo.getAll();

    users = users.map((user) => {
      const scorePerRace = JSON.parse(user.scorePerRace || '{}');
      const userScoreForRace = scorePerRace[raceId] || 0;
      return {
        ...user,
        score: userScoreForRace,
      };
    });

    users = users.sort((a, b) => b.score - a.score);

    return users.map((user, index) => ({
      ...user,
      position: index + 1,
    }));
  }
}
