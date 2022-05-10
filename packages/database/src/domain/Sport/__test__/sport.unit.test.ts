import { datatype } from 'faker';
import { SportTestDatabase } from '..';

describe('Sport Unit Test', () => {
  it('should create a empty database', () => {
    const repo = new SportTestDatabase();

    expect(repo.getSports().length).toBe(0);
  });

  it('should create with values', () => {
    const newSport = {
      id: 1,
      level: 1,
      userId: 'userId',
      sportRefId: 1,
      sportRef: {
        title: 'Sport Title Dummy',
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const repo = new SportTestDatabase([newSport]);

    expect(repo.getSports().length).toBe(1);
  });

  it('should create a new sport', async () => {
    const repo = new SportTestDatabase();

    const userId = datatype.uuid();

    await repo.createSport({ level: 1, sportRefId: 1, userId });

    expect(repo.getSports().length).toBe(1);
    expect(repo.getSports()[0].userId).toBe(userId);
  });

  it('should return sport detail', async () => {
    const repo = new SportTestDatabase();

    const userId = datatype.uuid();

    const newSport = await repo.createSport({
      level: 1,
      sportRefId: 1,
      userId
    });

    expect((await repo.getSportDetail(newSport.id)).userId).toBe(userId);
    expect((await repo.getSportDetail(newSport.id)).sportRef.id).toBe(1);
    expect((await repo.getSportDetail(newSport.id)).level).toBe(1);
  });

  it('should check if it sport exists', async () => {
    const repo = new SportTestDatabase();

    const userId = datatype.uuid();

    await repo.createSport({ level: 1, sportRefId: 1, userId });

    expect(await repo.checkSportExists({ sportRefId: 1, userId })).toBe(true);
  });

  it('should check if it sport not exists', async () => {
    const repo = new SportTestDatabase();

    const userId = datatype.uuid();

    expect(await repo.checkSportExists({ sportRefId: 1, userId })).toBe(false);
  });

  it('should get a sport', async () => {
    const repo = new SportTestDatabase();

    const userId = datatype.uuid();

    const newSport = await repo.createSport({
      level: 1,
      sportRefId: 1,
      userId
    });

    await repo.updateSport({ sportId: newSport.id, level: 2 });

    expect((await repo.getSportDetail(newSport.id)).userId).toBe(userId);
    expect((await repo.getSportDetail(newSport.id)).level).toBe(2);
  });

  it('should update a another sport', async () => {
    const repo = new SportTestDatabase();

    const userId = datatype.uuid();

    const newSport = await repo.createSport({
      level: 1,
      sportRefId: 1,
      userId
    });
    const result = await repo.updateSport({ sportId: newSport.id, level: 2 });

    expect(result.level).toBe(2);
    expect(result.sportRefId).toBe(1);
    expect(result.userId).toBe(userId);
  });

  it('should delete a sport with deleted at', async () => {
    const repo = new SportTestDatabase();

    const userId = datatype.uuid();

    const newSport = await repo.createSport({
      level: 1,
      sportRefId: 1,
      userId
    });
    const result = await repo.deleteSport(newSport.id);

    expect(result).toBe(true);
  });
});
