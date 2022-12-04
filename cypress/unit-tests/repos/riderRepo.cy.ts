import { Rider } from '@prisma/client';
import RiderRepo from '../../../src/lib/repos/riderRepo';

const rider: Rider = {
  id: '1',
  firstname: 'Jeremy',
  lastname: 'Seewer',
  numberplate: 91,
};

describe('Riders Repository', () => {
  it('should call prisma.rider.findMany when calling getAll', () => {
    const prismaStub = {
      rider: {
        findMany: cy.stub().returns([]),
      },
    };
    const repo = new RiderRepo(prismaStub as any);
    repo.getAll();
    expect(prismaStub.rider.findMany).to.be.called;
  });

  it('should call prisma.rider.findUnique when calling getById', () => {
    const prismaStub = {
      rider: {
        findUnique: cy.stub().returns(null),
      },
    };
    const repo = new RiderRepo(prismaStub as any);
    repo.getById('123');
    expect(prismaStub.rider.findUnique).to.be.calledWith({ where: { id: '123' } });
  });

  it('should call prisma.rider.create when calling create', () => {
    const prismaStub = {
      rider: {
        create: cy.stub().returns({}),
      },
    };
    const repo = new RiderRepo(prismaStub as any);
    repo.create(rider);
    expect(prismaStub.rider.create).to.be.calledWith({ data: rider });
  });

  it('should call prisma.rider.update when calling update', () => {
    const prismaStub = {
      rider: {
        update: cy.stub().returns({}),
      },
    };
    const repo = new RiderRepo(prismaStub as any);
    repo.update('123', rider);
    expect(prismaStub.rider.update).to.be.calledWith({ where: { id: '123' }, data: rider });
  });

  it('should call prisma.rider.delete when calling delete', () => {
    const prismaStub = {
      rider: {
        delete: cy.stub().returns({}),
      },
    };
    const repo = new RiderRepo(prismaStub as any);
    repo.delete('123');
    expect(prismaStub.rider.delete).to.be.calledWith({ where: { id: '123' } });
  });
});
