import { PrismaClient } from '@prisma/client';
import { Rider } from '../types';

export default class RiderRepo {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getAll(): Promise<Rider[]> {
    return await this.prisma.rider.findMany({
      orderBy: {
        numberplate: 'asc',
      },
    });
  }

  public async getById(id: string): Promise<Rider | null> {
    return await await this.prisma.rider.findUnique({
      where: {
        id,
      },
    });
  }

  public async create(entity: Rider): Promise<Rider> {
    return await this.prisma.rider.create({
      data: entity,
    });
  }

  public async update(id: string, entity: Rider): Promise<Rider> {
    return await this.prisma.rider.update({
      where: {
        id,
      },
      data: entity,
    });
  }

  public async delete(id: string): Promise<Rider> {
    return await this.prisma.rider.delete({
      where: {
        id,
      },
    });
  }
}
