import { SportTestFactory } from '..';

describe('Sport Test Factory Unit Test', () => {
  it('should return the sport test data', async () => {
    const factory = new SportTestFactory();

    const testData = factory.getSportTestData();
    expect(!!testData).toBe(true);
  });
});
