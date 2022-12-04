import RiderService from '../../../src/lib/services/riderService';

describe('Rider Service', () => {
  it('should call riderRepo.getAll when calling getAll', () => {
    const riderRepoStub = {
      getAll: cy.stub().returns([]),
    };
    const service = new RiderService(riderRepoStub as any);
    const nextApiRequestStub = {
      query: {},
    };
    const nextApiResponseStub = {
      status: cy.stub().returnsThis(),
      json: cy.stub().returnsThis(),
    };
    service.getRiders(nextApiRequestStub as any, nextApiResponseStub as any);
    expect(riderRepoStub.getAll).to.be.called;
  });
});
