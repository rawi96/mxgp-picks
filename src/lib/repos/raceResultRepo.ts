import { PrismaClient } from '@prisma/client';
import { RaceResult } from '../types/types';

export default class RaceResultRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public createOrUpdate = async (entity: RaceResult, raceId: string): Promise<any> => {
    const data = {
      id: entity.id,
      resultId: entity.result.id,
      raceId,
    };

    const result = await this.prisma.raceResult.upsert({
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
}
