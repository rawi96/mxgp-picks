import { PrismaClient } from '@prisma/client';
import { Pick } from '../types';

export default class PickRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private includeNested = {
    include: {
      result: {
        include: {
          first: true,
          second: true,
          third: true,
          fourth: true,
          fifth: true,
          wildcard: true,
        },
      },
      race: true,
    },
  };

  public async getByUserId(userId: string): Promise<Pick[]> {
    return await this.prisma.pick.findMany({
      where: {
        userId,
      },
      ...this.includeNested,
    });
  }

  public async getByRaceId(raceId: string): Promise<Pick[]> {
    return await this.prisma.pick.findMany({
      where: {
        raceId,
      },
      ...this.includeNested,
    });
  }

  public async deleteMany(ids: string[]): Promise<any> {
    return await this.prisma.pick.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  public async create(pick: Pick): Promise<Pick | null> {
    if (!pick.result) {
      return null;
    }

    await this.prisma.result.create({
      data: {
        id: pick.resultId,
        firstId: pick.result.first.id,
        secondId: pick.result.second.id,
        thirdId: pick.result.third.id,
        fourthId: pick.result.fourth.id,
        fifthId: pick.result.fifth.id,
        wildcardId: pick.result.wildcard.id,
      },
    });

    return await this.prisma.pick.create({
      data: {
        id: pick.id,
        raceId: pick.raceId,
        userId: pick.userId,
        resultId: pick.resultId,
      },
      ...this.includeNested,
    });
  }

  public async update(pick: Pick): Promise<Pick | null> {
    if (!pick.result) {
      return null;
    }

    await this.prisma.result.update({
      where: {
        id: pick.resultId,
      },
      data: {
        firstId: pick.result.first.id,
        secondId: pick.result.second.id,
        thirdId: pick.result.third.id,
        fourthId: pick.result.fourth.id,
        fifthId: pick.result.fifth.id,
        wildcardId: pick.result.wildcard.id,
      },
    });

    return await this.prisma.pick.update({
      where: {
        id: pick.id,
      },
      data: {
        raceId: pick.raceId,
        userId: pick.userId,
        resultId: pick.resultId,
      },
      ...this.includeNested,
    });
  }
}
