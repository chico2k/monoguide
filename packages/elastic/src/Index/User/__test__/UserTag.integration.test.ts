import type { User } from '@prisma/client';
import { TagTestFactory, UserTestFactory } from '@sportsguide/database';
import { UserElastic } from '..';
import { TestingHelper } from '../../../lib/test';

describe('User Tag Integration Test', () => {
  const userElastic = new UserElastic();

  const tagFactory = new TagTestFactory();
  const userFactory = new UserTestFactory();

  const tagList = tagFactory.getTags();
  const tag = tagList[0];
  const secondTag = tagList[1];

  let user: User;

  beforeAll(async () => {
    [user] = userFactory.getUserTestData();
    await userElastic.createUser(user);
  });

  it('should create a new tag', async () => {
    /**
     * Create Tag
     */
    const response = await userElastic.createTag(user.id, tag);

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
    expect(transformedUser.tag.length).toBe(1);
    expect(transformedUser.tag).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: tag.id,
          tagRef: {
            id: tag.tagRef.id,
            text: tag.tagRef.text
          }
        })
      ])
    );
  });

  it('should create a second tag', async () => {
    /**
     * Create Tag
     */
    const response = await userElastic.createTag(user.id, secondTag);

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
    expect(transformedUser.tag.length).toBe(2);
    expect(transformedUser.tag).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: secondTag.id,
          tagRef: {
            id: secondTag.tagRef.id,
            text: secondTag.tagRef.text
          }
        })
      ])
    );
  });

  it('should delete a tag', async () => {
    const response = await userElastic.deleteTag(user.id, tag.id);

    /**
     * Get User Detail
     */
    await TestingHelper.wait();
    const userDetailResponse = await userElastic.getUserDetail(user.username);
    const transformedUser =
      TestingHelper.transformDetailResponseToUser(userDetailResponse);

    expect(response).toBe(true);

    expect(transformedUser.tag.length).toBe(1);

    expect(transformedUser.tag).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: tag.id,
          tagRef: {
            id: tag.tagRef.id,
            text: tag.tagRef.text
          }
        })
      ])
    );

    expect(transformedUser.tag).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: secondTag.id,
          tagRef: {
            id: secondTag.tagRef.id,
            text: secondTag.tagRef.text
          }
        })
      ])
    );
  });
});
