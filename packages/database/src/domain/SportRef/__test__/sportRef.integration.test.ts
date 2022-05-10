import { User } from '@prisma/client';
import { SportRefDatabase } from '..';
import { sportRefSeed } from '../../../../prisma/data/sportRef';
import { SportDatabase } from '../../Sport/SportDatabase';
import { UserDatabase, UserTestFactory } from '../../User';

describe('SportRef Integration Test', () => {
  let user: User;

  const sportRefDB = new SportRefDatabase();
  const sportDB = new SportDatabase();

  beforeAll(async () => {
    const userTestFactory = new UserTestFactory();

    const userCreateData = userTestFactory.getUserCreateData();
    const userDatabase = new UserDatabase();
    user = await userDatabase.createUser(userCreateData);
  });

  it('should return the full list', async () => {
    const list = await sportRefDB.getSportRefUser(user.id);

    expect(sportRefSeed.length).toBe(list.length);
  });

  it('should return a list without the new sport', async () => {
    await sportDB.createSport({
      level: 1,
      sportRefId: sportRefSeed[0].id,
      userId: user.id
    });

    const list = await sportRefDB.getSportRefUser(user.id);
    const { length } = list;

    expect(sportRefSeed.length - 1).toBe(length);

    expect(list).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: sportRefSeed[0].id
        })
      ])
    );
  });
});
