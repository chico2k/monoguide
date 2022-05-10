import { SportRefTestDatabase } from '..';

describe('SportRef Unit Test', () => {
  it('should return sporttypes', async () => {
    const sportRefTestDatabase = new SportRefTestDatabase();

    const result = await sportRefTestDatabase.getSportRefUser('user_id');

    expect(result.length).toBeGreaterThan(0);
  });
});
