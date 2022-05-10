import { Location } from '@prisma/client';
import { datatype } from 'faker';
import { LocationTestFactory, LocationTestDatabase } from '..';

describe('Location Unit Test', () => {
  const testDB = new LocationTestDatabase();
  const factory = new LocationTestFactory();
  let location: Location;
  const userId = datatype.uuid();

  it('should create a new Location', async () => {
    const mapBox = factory.getExampleLocationMapbox();

    location = await testDB.createLocation(userId, mapBox);

    expect(!!location).toBe(true);

    const { length } = testDB.getLocations();
    expect(length).toBe(1);
  });

  it('should delete a location', async () => {
    const result = await testDB.deleteLocation(location.id);

    expect(result).toBe(true);
  });
});
