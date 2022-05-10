import { User, Location } from '@prisma/client';
import { AuthTestFactory } from '@sportsguide/auth';
import { LocationDatabase, LocationTestFactory } from '..';
import { UserDatabase } from '../../User';

describe('Location Integration Test', () => {
  const testDB = new LocationDatabase();

  const userDatabase = new UserDatabase();

  const locationFactory = new LocationTestFactory();
  const locationInput = locationFactory.getExampleLocationMapbox();

  let user: User;
  let location: Location;

  beforeAll(async () => {
    const userCreateData = AuthTestFactory.generateClerkUser();
    user = await userDatabase.createUser(userCreateData);
  });

  it('should create a location in the database', async () => {
    location = await testDB.createLocation(user.id, locationInput);

    expect(!!location).toBe(true);

    expect(location).toEqual(
      expect.objectContaining({
        mapboxId: locationInput.id,
        userId: user.id
      })
    );
  });

  it('should soft delete the location', async () => {
    const success = await testDB.deleteLocation(location.id);

    expect(success).toBe(true);
  });
});
