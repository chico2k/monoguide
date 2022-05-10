import {
  UserTestFactory,
  SportTestFactory,
  ISportWithSportRef
} from '@sportsguide/database';
import type { User } from '@prisma/client';
import { UserElastic } from '..';
import { TestingHelper } from '../../../lib/test';

describe('User Sport Integration Test', () => {
  const userElastic = new UserElastic();
  const userFactory = new UserTestFactory();
  const sportFactory = new SportTestFactory();

  let user: User;
  let sport: ISportWithSportRef;
  let updatedSport: ISportWithSportRef;

  it('should create a new user', async () => {
    /**
     * Create User
     */
    [user] = userFactory.getUserTestData();
    const resp = await userElastic.createUser(user);

    /**
     * Assertions
     */
    expect(resp).toBe(true);
  });

  it('should get the user detail', async () => {
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
    expect(user).toEqual(
      expect.objectContaining({
        ...transformedUser,
        createdAt: new Date(transformedUser.createdAt)
      })
    );
  });

  it('should create a sport', async () => {
    /**
     * Create Sport
     */
    [sport] = sportFactory.getSportTestData();
    const resp = await userElastic.createSport(user.id, sport);

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
    expect(transformedUser.sport).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: sport.id,
          level: sport.level,
          sportRef: {
            id: sport.sportRef.id,
            title: sport.sportRef.title
          }
        })
      ])
    );

    expect(resp).toBe(true);
  });

  it('should create a second sport', async () => {
    /**
     * Create Sport
     */
    const sport = sportFactory.getSportTestData()[1];
    const resp = await userElastic.createSport(user.id, sport);

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
    expect(resp).toBe(true);

    /**
     * Assertions
     */
    expect(transformedUser.sport).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: sport.id,
          level: sport.level,
          sportRef: {
            id: sport.sportRef.id,
            title: sport.sportRef.title
          }
        })
      ])
    );
    expect(transformedUser.sport.length).toBe(2);
  });

  it('should update a sport', async () => {
    /**
     * Update Sport
     */
    const newLevel = 2;
    updatedSport = { ...sport, level: newLevel };
    const resp = await userElastic.updateSport(user.id, updatedSport);

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
    expect(resp).toBe(true);
    expect(transformedUser.sport).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: updatedSport.id,
          level: updatedSport.level,
          sportRef: {
            id: updatedSport.sportRef.id,
            title: updatedSport.sportRef.title
          }
        })
      ])
    );
  });

  it('should delete a sport', async () => {
    /**
     * Delete a Sport
     */
    const resp = await userElastic.deleteSport(user.id, sport.id);

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
    expect(resp).toBe(true);
    expect(transformedUser.sport.length).toBe(1);

    expect(transformedUser.sport).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: updatedSport.id,
          level: updatedSport.level,
          sportRef: {
            id: updatedSport.sportRef.id,
            title: updatedSport.sportRef.title
          }
        })
      ])
    );
  });
});
