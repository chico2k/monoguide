import { LocationTestFactory, UserTestFactory } from '@sportsguide/database';
import { UserElastic } from '..';
import { TestingHelper } from '../../../lib/test';

describe('User Location Integration Test', () => {
  const userElastic = new UserElastic();
  const userFactory = new UserTestFactory();
  const locationFactory = new LocationTestFactory();

  const userList = userFactory.getUserTestData();
  const locationList = locationFactory.gestLocationTestData();

  const user = userList[0];

  beforeAll(async () => {
    await userElastic.createUser(user);
  });

  it('should update the location', async () => {
    /**
     * Update Location
     */
    const location = locationList[0];
    const response = await userElastic.updateLocation(user.id, location);

    /**
     * Get User Detail
     */
    await TestingHelper.wait();
    const userDetailResponse = await userElastic.getUserDetail(user.username);
    const transformedUser =
      TestingHelper.transformDetailResponseToUser(userDetailResponse);

    /**
     * Assertions
     */
    expect(response).toBe(true);
    expect(location).toEqual(expect.objectContaining(transformedUser.location));
  });

  it('should update with a new location', async () => {
    /**
     * Update Location
     */
    const location = locationList[1];
    const response = await userElastic.updateLocation(user.id, location);

    /**
     * Get User Detail
     */
    await TestingHelper.wait();
    const userDetailResponse = await userElastic.getUserDetail(user.username);
    const transformedUser =
      TestingHelper.transformDetailResponseToUser(userDetailResponse);

    /**
     * Assertions
     */
    expect(response).toBe(true);
    expect(location).toEqual(expect.objectContaining(transformedUser.location));
  });
});
