import { AuthTestFactory } from '@sportsguide/auth';
import { UserTestDatabase } from '..';

describe('User Unit Test', () => {
  const userData = AuthTestFactory.generateClerkUser();
  it('should create a new user', async () => {
    const testDB = new UserTestDatabase();

    await testDB.createUser(userData);

    const list = testDB.getUser();

    expect(list.length).toBe(1);
    expect(list).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...userData
        })
      ])
    );
  });

  it('should get the current username', async () => {
    const testDB = new UserTestDatabase();

    const user = await testDB.createUser(userData);

    const getUserName = await testDB.getCurrentUsername(userData.id);

    expect(user.username).toBe(getUserName);
  });

  it('should get user by username', async () => {
    const testDB = new UserTestDatabase();

    const user = await testDB.createUser(userData);

    const getUser = await testDB.getUserByUsername(user.username);

    expect(user).toStrictEqual(getUser);
  });
});
