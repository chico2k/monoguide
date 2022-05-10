import { LocationTestFactory } from '..';
import jsonFile from './mapbox.json';

describe('Location Test Factory Unit Test', () => {
  const testFactory = new LocationTestFactory();

  it('should get a list of test location test data', async () => {
    const testData = testFactory.getExampleLocationMapboxList();

    expect(testData).toStrictEqual(jsonFile);
  });

  it('should get one single mapbox location', async () => {
    const location = testFactory.getExampleLocationMapbox();

    expect([location].length).toEqual(1);
  });
});
