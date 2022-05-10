import { VitaTestFactory } from '../VitaTestFactory';

describe('Vita Test Factory Unit Test', () => {
  const factory = new VitaTestFactory();
  it('should generate Vita test data', async () => {
    const data = factory.getvitaTestData();

    expect(!!data).toBe(true);
  });
});
