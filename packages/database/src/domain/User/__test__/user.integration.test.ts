import { User } from '@prisma/client';
import { UserDatabase, UserTestFactory } from "..";

describe('User Integration Test', () => {
  let userTestFactory: UserTestFactory;
  let user: User;
  const db = new UserDatabase();

  beforeAll(async () => {
    userTestFactory = new UserTestFactory();
  });

  it('should create a new user', async () => {
    const userData = userTestFactory.getUserCreateData();

    user = await db.createUser(userData);

    expect(!!user).toBe(true);
  });

  it('should get user by username', async () => {
    const userName = await db.getUserByUsername(user.username);
    expect(user).toStrictEqual(userName);
  });

  it('should get the current username', async () => {
    const userName = await db.getCurrentUsername(user.id);
    expect(user.username).toStrictEqual(userName);
  });
});
