import { PrismaClient } from '@prisma/client';
import { Race } from '../types';

export default class RaceRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getAll(): Promise<Race[]> {
    return await prisma.race.findMany({
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
    return await prisma.race.create({
      data: entity,
    });
  }

  public async createNested(entity: Race): Promise<Race> {
    return await prisma.race.create({
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

  public async updateNested(id: string, entity: Race): Promise<Race> {
    return await prisma.race.update({
      where: {
        id,
      },
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
