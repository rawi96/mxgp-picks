import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { v4 as uuidv4 } from 'uuid';
import { default as UserRepo } from '../repos/userRepo';
import { User } from '../types/types';
import { comparePasswords, hashPassword } from '../utils/bcrypt';
import { REGEX_EMAIL, REGEX_PASSWORD } from '../utils/utils';
import EmailService from './emailService';

export default class UserService {
  private userRepo: UserRepo;
  private emailService: EmailService;

  constructor(userRepo: UserRepo, emailService: EmailService) {
    this.userRepo = userRepo;
    this.emailService = emailService;
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
      isVerified: false,
      verifyToken: uuidv4(),
      resetPasswordToken: null,
      createdAt: new Date(),
    };

    const url = `${process.env.VERCEL_ENV === 'production' ? 'https://mxgp-picks.com' : process.env.VERCEL_URL}`;

    const createdUser = await this.userRepo.create(newUser);
    await this.emailService.sendMail({
      to: createdUser.email,
      from: 'noreply@mxgp-picks.com',
      subject: 'Welcome to MXGP Picks!',
      text: `Click here to verify your account`,
      html: `Click <a href="${url}/verify-account/${createdUser.id}?token=${createdUser.verifyToken}">here</a> to verify your account.`,
    });

    return res.status(200).json(createdUser);
  }

  public async updateUser(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const { username, oldPassword, newPassword } = req.body;

    const session = await getSession({ req });

    if (!session?.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await this.userRepo.getById(session.user.id);
    if (!user) {
      return res.status(400).json({ message: 'Unauthorized' });
    }

    if (username) {
      const usernameExists = await this.userRepo.getByUsername(username);

      if (usernameExists) {
        return res.status(400).json({ message: 'Username already exists!' });
      }

      await this.userRepo.update(session.user.id, { ...user, username });

      return res.status(200).json({ message: 'Username updated' });
    }

    if (oldPassword && newPassword) {
      if (!REGEX_PASSWORD.test(newPassword)) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      if (!(await comparePasswords(oldPassword, user.password))) {
        return res.status(400).json({ message: 'Old password is incorrect!' });
      }

      await this.userRepo.update(session.user.id, { ...user, password: await hashPassword(newPassword) });

      return res.status(200).json({ message: 'Password updated' });
    }

    return res.status(400).json({ message: 'Missing fields' });
  }

  public async resetPassword(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const { newPassword, passwordResetToken, userId } = req.body;

    if (!newPassword || !passwordResetToken || !userId) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await this.userRepo.getById(userId);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!REGEX_PASSWORD.test(newPassword)) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    if (!user.resetPasswordToken || user.resetPasswordToken !== passwordResetToken) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    await this.userRepo.update(userId, { ...user, password: await hashPassword(newPassword) });

    return res.status(200).json({ message: 'Password updated' });
  }

  public async resendVerificationEmail(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const session = await getSession({ req });

    if (!session?.user.id) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await this.userRepo.getById(session.user.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const url = `${process.env.VERCEL_ENV === 'production' ? 'https://mxgp-picks.com' : process.env.VERCEL_URL}`;

    await this.emailService.sendMail({
      to: user.email,
      from: 'noreply@mxgp-picks.com',
      subject: 'Welcome to MXGP Picks!',
      text: `Click here to verify your account`,
      html: `Click <a href="${url}/verify-account/${user.id}?token=${user.verifyToken}">here</a> to verify your account.`,
    });

    return res.status(200).json({ message: 'Verification email sent' });
  }

  public async sendResetPasswordMail(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await this.userRepo.getByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Email not found!' });
    }

    const url = `${process.env.VERCEL_ENV === 'production' ? 'https://mxgp-picks.com' : process.env.VERCEL_URL}`;

    const resetPasswordToken = uuidv4();
    await this.userRepo.update(user.id, { ...user, resetPasswordToken });

    await this.emailService.sendMail({
      to: user.email,
      from: 'noreply@mxgp-picks.com',
      subject: 'Password reset',
      text: `Click here to set a new password`,
      html: `Click <a href="${url}/reset-password/${user.id}?token=${resetPasswordToken}">here</a> to set a new password.`,
    });

    return res.status(200).json({ message: 'Password reset email sent' });
  }

  public async verifyUser(req: NextApiRequest, res: NextApiResponse): Promise<void | NextApiResponse<any>> {
    const { userId, token } = req.query;

    if (!userId || !token) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await this.userRepo.getById(userId as string);

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (user.verifyToken !== token) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    await this.userRepo.update(userId as string, { ...user, isVerified: true });

    return res.status(200).json({ message: 'User verified' });
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
        isVerified: user?.isVerified,
        score: user?.score,
        scorePerRace: user?.scorePerRace,
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
      const userScoreForRace = scorePerRace[raceId]?.score || 0;
      const createdAt = scorePerRace[raceId]?.createdAt || 0;
      return {
        ...user,
        score: userScoreForRace,
        createdAt,
      };
    });

    users = users.sort((a, b) => {
      if (a.score === b.score) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return b.score - a.score;
    });

    return users.map((user, index) => ({
      ...user,
      position: index + 1,
    }));
  }
}
