import type { User } from '@prisma/client';
import { UserTestFactory, VitaTestFactory } from '@sportsguide/database';
import { UserElastic } from '..';
import { TestingHelper } from '../../../lib/test';

describe('User Tag Mock Unit Test', () => {
  const userElastic = new UserElastic();

  const vitaFactory = new VitaTestFactory();
  const userFactory = new UserTestFactory();

  const vitaList = vitaFactory.getvitaTestData();

  const vita = vitaList[0];
  const secondVita = vitaList[1];

  const updatedVita = {
    ...secondVita,
    text: 'A new Vita Text'
  };

  let user: User;
  let userId: string;

  beforeAll(async () => {
    [user] = userFactory.getUserTestData();
    await userElastic.createUser(user);

    userId = user.id;
  });

  it('should create new vita', async () => {
    /**
     * Create a new Vita
     */
    const response = await userElastic.createVita(userId, vita);

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
    expect(transformedUser.vita.length).toBe(1);
    expect(response).toBe(true);

    expect(transformedUser.vita).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: vita.id
        })
      ])
    );
  });

  it('should create a second vita', async () => {
    const response = await userElastic.createVita(userId, secondVita);
    /**
     * Get User Detail
     */
    await TestingHelper.wait();
    const userDetailResponse = await userElastic.getUserDetail(user.username);
    const transformedUser =
      TestingHelper.transformDetailResponseToUser(userDetailResponse);

    expect(transformedUser.vita.length).toBe(2);
    expect(response).toBe(true);
    expect(transformedUser.vita).toEqual(
      expect.arrayContaining([expect.objectContaining({ id: secondVita.id })])
    );
  });

  it('should update a vita', async () => {
    const response = await userElastic.updateVita(userId, updatedVita);
    /**
     * Get User Detail
     */
    await TestingHelper.wait();
    const userDetailResponse = await userElastic.getUserDetail(user.username);
    const transformedUser =
      TestingHelper.transformDetailResponseToUser(userDetailResponse);

    expect(transformedUser.vita.length).toBe(2);
    expect(response).toBe(true);

    expect(transformedUser.vita).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: updatedVita.id,
          text: updatedVita.text
        })
      ])
    );
  });

  it('should delete a vita', async () => {
    const response = await userElastic.deleteVita(userId, updatedVita.id);

    /**
     * Get User Detail
     */
    await TestingHelper.wait();
    const userDetailResponse = await userElastic.getUserDetail(user.username);
    const transformedUser =
      TestingHelper.transformDetailResponseToUser(userDetailResponse);

    expect(transformedUser.vita.length).toBe(1);
    expect(response).toBe(true);

    expect(transformedUser.vita).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: updatedVita.id
        })
      ])
    );
    expect(transformedUser.vita).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: vita.id
        })
      ])
    );
  });
});
