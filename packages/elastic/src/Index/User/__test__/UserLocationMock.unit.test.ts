import { LocationTestFactory, UserTestFactory } from '@sportsguide/database';
import { UserElasticMock } from '../__mock__';

describe('User Location Mock Unit Test', () => {
  const elasticMock = new UserElasticMock();
  const userFactory = new UserTestFactory();
  const locationFactory = new LocationTestFactory();
  const locationList = locationFactory.gestLocationTestData();

  const location = locationList[0];

  const [user] = userFactory.getUserTestData();
  const { id: userId } = user;

  it('should create a new location', async () => {
    await elasticMock.createUser(user);

    const response = await elasticMock.updateLocation(userId, location);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(response).toBe(true);
    expect(location).toEqual(expect.objectContaining(detail.location));
  });

  it('should update the location', async () => {
    const newLocation = locationList[1];

    const response = await elasticMock.updateLocation(userId, newLocation);

    const detail = elasticMock.getUserDetailelper(userId);

    expect(response).toBe(true);
    expect(newLocation).toEqual(expect.objectContaining(detail.location));
  });
});
