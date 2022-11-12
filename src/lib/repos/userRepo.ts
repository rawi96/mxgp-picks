import { PrismaClient } from '@prisma/client';
import { User } from '../types/types';

export default class UserRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getAll(): Promise<User[]> {
    return await this.prisma.user.findMany({
      orderBy: {
        score: 'desc',
      },
    });
  }

  public async getAllWithPosition(): Promise<User[]> {
    const users = await this.getAll();
    return users.map((user, index) => ({
      ...user,
      position: index + 1,
      email: '',
    }));
  }

  public async getById(id: string): Promise<User | null> {
    return await await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  public async getByEmail(email: string): Promise<User | null> {
    return await await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async getByUsername(username: string): Promise<User | null> {
    return await await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  public async create(entity: User): Promise<User> {
    return await this.prisma.user.create({
      data: entity,
    });
  }

  public async update(id: string, entity: User): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: entity,
    });
  }

  public async delete(id: string): Promise<User> {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
