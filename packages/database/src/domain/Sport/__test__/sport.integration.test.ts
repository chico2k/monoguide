import { User, Sport } from '@prisma/client';
import { SportDatabase } from '..';

import { UserDatabase, UserTestFactory } from '../../User';

describe('Sport Integration Test', () => {
  let user: User;
  const sportDB = new SportDatabase();
  let sport: Sport;

  beforeAll(async () => {
    const userTestFactory = new UserTestFactory();

    const userCreateData = userTestFactory.getUserCreateData();
    const userDatabase = new UserDatabase();
    user = await userDatabase.createUser(userCreateData);
  });

  it('should create one sport entry', async () => {
    sport = await sportDB.createSport({
      level: 1,
      sportRefId: 1,
      userId: user.id
    });

    const sports = await sportDB.getSportDetail(sport.id);

    if (!sports) throw new Error('NO_SPORTS');

    expect(sports).toStrictEqual(sport);
  });

  it('should update a sport', async () => {
    const newLevel = 2;

    await sportDB.updateSport({
      level: newLevel,
      sportId: sport.id
    });

    const sportDetail = await sportDB.getSportDetail(sport.id);
    if (!sportDetail) throw new Error('NO_SPORTS');

    expect(newLevel).toBe(sportDetail.level);
  });

  it('should soft delete a sport', async () => {
    const result = await sportDB.deleteSport(sport.id);

    expect(true).toBe(result);
  });
});
