import { PrismaClient } from '@prisma/client';
import { Race } from '../types';

export default class RaceRepo {
  private prisma: PrismaClient;

  private includeNested = {
    include: {
      raceResult: {
        include: {
          result: {
            include: {
              first: true,
              second: true,
              third: true,
              forth: true,
              fifth: true,
              wildcard: true,
            },
          },
        },
      },
    },
  };

  private getNestedData = (entity: Race) => {
    return {
      data: {
        ...entity,
        raceResult: {
          create: {
            id: entity.raceResult?.id,
            result: {
              create: {
                id: entity.raceResult?.result.id,
                first: {
                  connect: {
                    id: entity.raceResult?.result.first.id,
                  },
                },
                second: {
                  connect: {
                    id: entity.raceResult?.result.second.id,
                  },
                },
                third: {
                  connect: {
                    id: entity.raceResult?.result.third.id,
                  },
                },
                forth: {
                  connect: {
                    id: entity.raceResult?.result.forth.id,
                  },
                },
                fifth: {
                  connect: {
                    id: entity.raceResult?.result.fifth.id,
                  },
                },
                wildcard: {
                  connect: {
                    id: entity.raceResult?.result.wildcard.id,
                  },
                },
              },
            },
          },
        },
      },
    };
  };

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getAll(): Promise<any[]> {
    return await this.prisma.race.findMany({
      ...this.includeNested,
      orderBy: {
        date: 'asc',
      },
    });
  }

  public async getById(id: string): Promise<Race | null> {
    return await this.prisma.race.findUnique({
      where: {
        id,
      },
    });
  }

  public async create(entity: Race): Promise<Race> {
    return await this.prisma.race.create({
      data: entity,
    });
  }

  public async createNested(entity: Race): Promise<any> {
    return await this.prisma.race.create({
      ...this.getNestedData(entity),
      ...this.includeNested,
    });
  }

  public async update(id: string, entity: Race): Promise<Race> {
    return await this.prisma.race.update({
      where: {
        id,
      },
      data: entity,
    });
  }

  public async updateNested(id: string, entity: Race): Promise<any> {
    return await this.prisma.race.update({
      where: {
        id,
      },
      ...this.getNestedData(entity),
      ...this.includeNested,
    });
  }

  public async delete(id: string): Promise<Race> {
    return await this.prisma.race.delete({
      where: {
        id,
      },
    });
  }
}
