import { PrismaClient } from '@prisma/client';
import { Result } from '../types/types';

export default class ResultRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getAll(): Promise<any[]> {
    return await this.prisma.result.findMany();
  }

  public createOrUpdate = async (entity: Result): Promise<any> => {
    const data = {
      id: entity.id,
      firstId: entity.first.id,
      secondId: entity.second.id,
      thirdId: entity.third.id,
      fourthId: entity.fourth.id,
      fifthId: entity.fifth.id,
      wildcardId: entity.wildcard.id,
    };

    const result = await this.prisma.result.upsert({
      where: {
        id: entity.id,
      },
      update: {
        ...data,
      },
      create: {
        ...data,
      },
    });

    return result;
  };

  public async delete(id: string): Promise<any> {
    return await this.prisma.result.delete({
      where: {
        id,
      },
    });
  }

  public async deleteMany(ids: string[]): Promise<any> {
    return await this.prisma.result.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
