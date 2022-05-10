import { UserTestFactory } from '..';

describe('User Test Factory Unit Test', () => {
  const userTestFactory = new UserTestFactory();
  it('should generate user test data', async () => {
    const users = userTestFactory.getUserTestData();

    expect(!!users).toBe(true);
  });
});
