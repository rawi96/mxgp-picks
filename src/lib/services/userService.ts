import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { default as UserRepo } from '../repos/userRepo';
import { User } from '../types/types';
import { comparePasswords, hashPassword } from '../utils/bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../utils/utils';

export default class UserService {
  private userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
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
    };

    const createdUser = await this.userRepo.create(newUser);
    return res.status(200).json(createdUser);
  }

  public async getUsers(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const users = await this.userRepo.getAllWithPosition();
    return res.status(200).json(users);
  }

  public async authorize(email: string, password: string): Promise<User | null> {
    console.log(email, password);
    const user = await this.userRepo.getByEmail(email);
    console.log(user);
    if (user && (await comparePasswords(password, user.password))) {
      return user;
    } else {
      return null;
    }
  }

  public async createCustomSession(session: any): Promise<User | null> {
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
}
